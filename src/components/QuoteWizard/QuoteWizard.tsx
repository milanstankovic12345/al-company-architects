import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { contactMethods, finishes, labelOf, materials, productTypes } from "@/data/quoteOptions";
import { emptyQuote, validatePhotos, validateStep, type FieldErrors, type QuoteData } from "@/lib/quoteSchema";
import { isCoolingDown, markSent, PHONE_FALLBACK, submitToFormspree } from "@/lib/submitForm";
import { StepContact, StepDimensions, StepFinish, StepMaterial, StepPhotos, StepProduct } from "./Steps";

const STORAGE_KEY = "al-quote-draft";
const COOLDOWN_KEY = "al-quote-last-sent";

const STEPS = [
  { title: "Šta vam je potrebno?", hint: "Izaberite tip proizvoda." },
  { title: "Od kog materijala?", hint: "PVC ili aluminijum — pomoći ćemo vam da odaberete." },
  { title: "Okvirne dimenzije i količina", hint: "Dovoljne su približne mere u milimetrima." },
  { title: "Boja i obrada", hint: "Izaberite željeni izgled profila." },
  { title: "Fotografija otvora (opciono)", hint: "Pomaže nam da brže pripremimo ponudu." },
  { title: "Vaši kontakt podaci", hint: "Javićemo vam se sa ponudom u najkraćem roku." },
];
const PHOTO_STEP = 4;

function loadDraft(): { step: number; data: QuoteData } {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { step: Math.min(Number(parsed.step) || 0, STEPS.length - 1), data: { ...emptyQuote, ...parsed.data, consent: false } };
    }
  } catch {
    // storage unavailable or corrupt — start fresh
  }
  return { step: 0, data: emptyQuote };
}

function buildPayload(d: QuoteData): Record<string, string> {
  return {
    _subject: "Nova ponuda — AL Company",
    "Tip proizvoda": labelOf(productTypes, d.product),
    Materijal: labelOf(materials, d.material),
    "Širina (mm)": d.width,
    "Visina (mm)": d.height,
    Količina: d.quantity,
    "Boja / obrada": labelOf(finishes, d.finish),
    "Napomena o boji": d.finishNote,
    name: d.name,
    email: d.email,
    phone: d.phone,
    Mesto: d.city,
    "Željeni kontakt": labelOf(contactMethods, d.contactMethod),
    message: d.note,
  };
}

const QuoteWizard = () => {
  const [draft] = useState(loadDraft);
  const [step, setStep] = useState(draft.step);
  const [data, setData] = useState<QuoteData>(draft.data);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState<null | { photosDropped: boolean }>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (done) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data: { ...data, consent: false } }));
    } catch {
      // ignore
    }
  }, [step, data, done]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, done]);

  const set = <K extends keyof QuoteData>(key: K, value: QuoteData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const addFiles = (incoming: File[]) => {
    const next = [...files, ...incoming];
    const problem = validatePhotos(next);
    if (problem) {
      setErrors({ photos: problem });
      return;
    }
    setErrors({});
    setFiles(next);
  };

  const validateCurrent = (): boolean => {
    const found = step === PHOTO_STEP ? (validatePhotos(files) ? { photos: validatePhotos(files)! } : {}) : validateStep(step, data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      requestAnimationFrame(() => document.getElementById(first)?.focus());
      return false;
    }
    return true;
  };

  const next = () => {
    if (validateCurrent()) setStep((s) => s + 1);
  };

  const back = () => {
    setErrors({});
    setSubmitError("");
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (honeypotRef.current?.value) {
      setDone({ photosDropped: false });
      return;
    }
    if (!validateCurrent()) return;
    if (isCoolingDown(COOLDOWN_KEY)) {
      setSubmitError("Zahtev je upravo poslat. Sačekajte minut pre slanja novog.");
      return;
    }

    setSubmitting(true);
    const payload = buildPayload(data);
    let photosDropped = false;
    let result;
    if (files.length > 0) {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f, i) => fd.append(`fotografija-${i + 1}`, f, f.name));
      result = await submitToFormspree(fd);
      if (!result.ok) {
        // Free Formspree plans reject file uploads: retry once without the files
        photosDropped = true;
        result = await submitToFormspree({ ...payload, "Fotografije (nisu priložene)": files.map((f) => f.name).join(", ") });
      }
    } else {
      result = await submitToFormspree(payload);
    }
    setSubmitting(false);

    if (result.ok) {
      markSent(COOLDOWN_KEY);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      setDone({ photosDropped });
      toast.success("Vaš zahtev za ponudu je poslat!");
    } else {
      setSubmitError(result.error);
    }
  };

  if (done) {
    return (
      <div className="border border-border bg-muted/30 p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-accent" size={30} />
        </div>
        <h2 ref={headingRef} tabIndex={-1} role="status" className="text-2xl font-heading font-bold text-foreground mb-3 outline-none">
          Zahtev je poslat!
        </h2>
        <p className="font-body text-muted-foreground max-w-md mx-auto">
          Hvala vam. Javićemo se putem željenog kanala ({labelOf(contactMethods, data.contactMethod).toLowerCase()}) u najkraćem roku, a tačnu cenu dajemo nakon besplatnog merenja.
        </p>
        {done.photosDropped && (
          <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto border border-border p-3">
            Fotografije nismo uspeli da priložimo. Pošaljite ih na milanaiagency@gmail.com ili Viber na +381 63 369 392.
          </p>
        )}
      </div>
    );
  }

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];
  const stepProps = { data, errors, set };

  return (
    <form onSubmit={submit} noValidate className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-2 text-sm font-body text-muted-foreground">
          <span>
            Korak {step + 1} od {STEPS.length}
          </span>
          <span>{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
        </div>
        <Progress value={((step + 1) / STEPS.length) * 100} aria-label={`Korak ${step + 1} od ${STEPS.length}`} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="font-heading font-bold text-xl text-foreground mb-1 outline-none">
              {current.title}
            </h2>
            <p className="font-body text-sm text-muted-foreground">{current.hint}</p>
          </div>

          {step === 0 && <StepProduct {...stepProps} />}
          {step === 1 && <StepMaterial {...stepProps} />}
          {step === 2 && <StepDimensions {...stepProps} />}
          {step === 3 && <StepFinish {...stepProps} />}
          {step === PHOTO_STEP && (
            <StepPhotos files={files} error={errors.photos} onAdd={addFiles} onRemove={(i) => setFiles((f) => f.filter((_, idx) => idx !== i))} />
          )}
          {step === 5 && <StepContact {...stepProps} honeypotRef={honeypotRef} />}
        </motion.div>
      </AnimatePresence>

      <div aria-live="assertive">
        {submitError && (
          <p role="alert" className="mt-6 text-sm text-destructive border border-destructive/30 bg-destructive/5 p-3">
            {submitError} Možete nas i pozvati na {PHONE_FALLBACK}.
          </p>
        )}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button type="button" variant="ghost" onClick={back} disabled={step === 0 || submitting} className="gap-2">
          <ArrowLeft size={16} /> Nazad
        </Button>
        {isLast ? (
          <Button type="submit" variant="hero" disabled={submitting} className="gap-2">
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            {submitting ? "Slanje..." : "Pošaljite zahtev"}
          </Button>
        ) : (
          <Button type="button" variant="hero" onClick={next} className="gap-2">
            {step === PHOTO_STEP && files.length === 0 ? "Preskoči" : "Dalje"} <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </form>
  );
};

export default QuoteWizard;
