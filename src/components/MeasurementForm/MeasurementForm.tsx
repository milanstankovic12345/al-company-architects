import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import ChoiceGroup from "@/components/QuoteWizard/ChoiceGroup";
import { FieldError, TextField } from "@/components/QuoteWizard/Steps";
import { contactMethods, labelOf } from "@/data/quoteOptions";
import { OTHER_TOWN, timeWindows, towns } from "@/data/measurementOptions";
import { bookingRange, emptyMeasurement, validateMeasurement, type MeasurementData, type MeasurementErrors } from "@/lib/measurementSchema";
import { isCoolingDown, markSent, PHONE_FALLBACK, submitToFormspree } from "@/lib/submitForm";

const COOLDOWN_KEY = "al-measurement-last-sent";

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("sr-Latn-RS", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};

const MeasurementForm = () => {
  const [data, setData] = useState<MeasurementData>(emptyMeasurement);
  const [errors, setErrors] = useState<MeasurementErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const range = useMemo(() => bookingRange(), []);

  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);

  const set = <K extends keyof MeasurementData>(key: K, value: MeasurementData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (honeypotRef.current?.value) {
      setDone(true);
      return;
    }
    const found = validateMeasurement(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      requestAnimationFrame(() => document.getElementById(first)?.focus());
      return;
    }
    if (isCoolingDown(COOLDOWN_KEY)) {
      setSubmitError("Zahtev je upravo poslat. Sačekajte minut pre slanja novog.");
      return;
    }

    setSubmitting(true);
    const town = data.town === OTHER_TOWN ? data.otherTown : labelOf(towns, data.town);
    const result = await submitToFormspree({
      _subject: "Zakazivanje merenja — AL Company",
      Mesto: town,
      Adresa: data.address,
      "Željeni datum": formatDate(data.date),
      "Vremenski period": labelOf(timeWindows, data.timeWindow),
      name: data.name,
      phone: data.phone,
      email: data.email,
      "Željeni kontakt": labelOf(contactMethods, data.contactMethod),
      message: data.note,
    });
    setSubmitting(false);

    if (result.ok) {
      markSent(COOLDOWN_KEY);
      setDone(true);
      toast.success("Zahtev za merenje je poslat!");
    } else {
      setSubmitError(result.error);
    }
  };

  if (done) {
    return (
      <div className="border border-border bg-muted/30 p-8 md:p-12 text-center max-w-3xl mx-auto">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CalendarCheck className="text-accent" size={30} />
        </div>
        <h2 ref={successRef} tabIndex={-1} role="status" className="text-2xl font-heading font-bold text-foreground mb-3 outline-none">
          Zahtev za merenje je poslat!
        </h2>
        <p className="font-body text-muted-foreground max-w-md mx-auto">
          {data.date && (
            <>
              Željeni termin: <strong className="text-foreground">{formatDate(data.date)}</strong>, {labelOf(timeWindows, data.timeWindow).toLowerCase()}.{" "}
            </>
          )}
          Pozvaćemo vas radi potvrde termina. Termin nije konačan dok ga ne potvrdimo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="max-w-3xl mx-auto space-y-10">
      <fieldset className="space-y-5">
        <legend className="font-heading font-bold text-xl text-foreground mb-1">Gde vršimo merenje?</legend>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="town">Mesto / opština *</Label>
            <Select value={data.town} onValueChange={(v) => set("town", v)}>
              <SelectTrigger id="town" aria-invalid={!!errors.town} aria-describedby={errors.town ? "town-error" : undefined}>
                <SelectValue placeholder="Izaberite mesto" />
              </SelectTrigger>
              <SelectContent>
                {towns.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError id="town" message={errors.town} />
          </div>
          {data.town === OTHER_TOWN && (
            <TextField id="otherTown" label="Naziv mesta *" autoComplete="address-level2" value={data.otherTown} error={errors.otherTown} onChange={(v) => set("otherTown", v)} />
          )}
          <div className={data.town === OTHER_TOWN ? "sm:col-span-2" : ""}>
            <TextField id="address" label="Adresa (ulica i broj)" autoComplete="street-address" value={data.address} error={errors.address} onChange={(v) => set("address", v)} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-heading font-bold text-xl text-foreground mb-1">Kada vam odgovara?</legend>
        <div className="space-y-2 sm:max-w-xs">
          <Label htmlFor="date">Željeni datum *</Label>
          <Input
            id="date"
            type="date"
            min={range.min}
            max={range.max}
            value={data.date}
            onChange={(e) => set("date", e.target.value)}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "date-error" : "date-hint"}
          />
          {!errors.date && (
            <p id="date-hint" className="text-xs text-muted-foreground">
              Radnim danima i subotom. Termin potvrđujemo telefonom.
            </p>
          )}
          <FieldError id="date" message={errors.date} />
        </div>
        <ChoiceGroup name="timeWindow" legend="Vremenski period" options={timeWindows} value={data.timeWindow} onChange={(v) => set("timeWindow", v)} error={errors.timeWindow} columns="grid-cols-2 lg:grid-cols-4" />
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-heading font-bold text-xl text-foreground mb-1">Vaši kontakt podaci</legend>
        <div className="grid sm:grid-cols-2 gap-5">
          <TextField id="name" label="Ime i prezime *" autoComplete="name" value={data.name} error={errors.name} onChange={(v) => set("name", v)} />
          <TextField id="phone" label="Telefon *" type="tel" autoComplete="tel" placeholder="+381 6X XXX XXXX" value={data.phone} error={errors.phone} onChange={(v) => set("phone", v)} />
          <TextField id="email" label="E-mail adresa *" type="email" autoComplete="email" placeholder="vas@email.com" value={data.email} error={errors.email} onChange={(v) => set("email", v)} />
        </div>
        <ChoiceGroup name="contactMethod" legend="Željeni način kontakta" options={contactMethods} value={data.contactMethod} onChange={(v) => set("contactMethod", v)} error={errors.contactMethod} columns="grid-cols-3" />
        <div className="space-y-2">
          <Label htmlFor="note">Napomena</Label>
          <Textarea id="note" rows={3} value={data.note} onChange={(e) => set("note", e.target.value)} aria-invalid={!!errors.note} aria-describedby={errors.note ? "note-error" : undefined} placeholder="Broj prozora, sprat, da li ima lifta..." />
          <FieldError id="note" message={errors.note} />
        </div>
      </fieldset>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Ne popunjavajte ovo polje</label>
        <input ref={honeypotRef} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox id="consent" checked={data.consent} onCheckedChange={(c) => set("consent", c === true)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-error" : undefined} className="mt-0.5" />
          <Label htmlFor="consent" className="text-sm font-normal leading-snug">
            Saglasan/na sam sa{" "}
            <Link to="/politika-privatnosti" target="_blank" className="text-accent hover:underline">
              politikom privatnosti
            </Link>{" "}
            i obradom podataka radi zakazivanja merenja. *
          </Label>
        </div>
        <FieldError id="consent" message={errors.consent} />
      </div>

      <div aria-live="assertive">
        {submitError && (
          <p role="alert" className="text-sm text-destructive border border-destructive/30 bg-destructive/5 p-3">
            {submitError} Možete nas i pozvati na {PHONE_FALLBACK}.
          </p>
        )}
      </div>

      <Button type="submit" variant="hero" size="lg" disabled={submitting} className="gap-2">
        {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {submitting ? "Slanje..." : "Zakažite merenje"}
      </Button>
    </form>
  );
};

export default MeasurementForm;
