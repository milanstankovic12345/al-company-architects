import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ImagePlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { contactMethods, finishSwatches, finishes, materials, PHOTO_LIMITS, productTypes } from "@/data/quoteOptions";
import type { FieldErrors, QuoteData } from "@/lib/quoteSchema";
import ChoiceGroup from "./ChoiceGroup";

interface StepProps {
  data: QuoteData;
  errors: FieldErrors;
  set: <K extends keyof QuoteData>(key: K, value: QuoteData[K]) => void;
}

export const FieldError =({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
      {message}
    </p>
  ) : null;

export const TextField = ({
  id,
  label,
  value,
  error,
  onChange,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "id">) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} {...rest} />
    <FieldError id={id} message={error} />
  </div>
);

export const StepProduct = ({ data, errors, set }: StepProps) => (
  <ChoiceGroup name="product" legend="Tip proizvoda" options={productTypes} value={data.product} onChange={(v) => set("product", v)} error={errors.product} />
);

export const StepMaterial = ({ data, errors, set }: StepProps) => (
  <ChoiceGroup name="material" legend="Materijal" options={materials} value={data.material} onChange={(v) => set("material", v)} error={errors.material} columns="sm:grid-cols-3" />
);

export const StepDimensions = ({ data, errors, set }: StepProps) => (
  <div className="space-y-5">
    <div className="grid sm:grid-cols-3 gap-5">
      <TextField id="width" label="Širina (mm) *" inputMode="numeric" placeholder="npr. 1200" value={data.width} error={errors.width} onChange={(v) => set("width", v)} />
      <TextField id="height" label="Visina (mm) *" inputMode="numeric" placeholder="npr. 1400" value={data.height} error={errors.height} onChange={(v) => set("height", v)} />
      <TextField id="quantity" label="Količina *" inputMode="numeric" value={data.quantity} error={errors.quantity} onChange={(v) => set("quantity", v)} />
    </div>
    <p className="text-sm font-body text-muted-foreground">
      Dovoljne su okvirne mere. Tačne mere uzimamo prilikom besplatnog merenja na objektu.
    </p>
  </div>
);

export const StepFinish = ({ data, errors, set }: StepProps) => (
  <div className="space-y-5">
    <ChoiceGroup name="finish" legend="Boja i obrada" options={finishes} value={data.finish} onChange={(v) => set("finish", v)} error={errors.finish} swatches={finishSwatches} columns="sm:grid-cols-2 lg:grid-cols-3" />
    <div className="space-y-2">
      <Label htmlFor="finishNote">Napomena o boji (RAL, drvodekor...)</Label>
      <Input id="finishNote" value={data.finishNote} onChange={(e) => set("finishNote", e.target.value)} aria-invalid={!!errors.finishNote} aria-describedby={errors.finishNote ? "finishNote-error" : undefined} placeholder="npr. RAL 7016 spolja, bela iznutra" />
      <FieldError id="finishNote" message={errors.finishNote} />
    </div>
  </div>
);

interface PhotoProps {
  files: File[];
  error?: string;
  onAdd: (files: File[]) => void;
  onRemove: (index: number) => void;
}

export const StepPhotos = ({ files, error, onAdd, onRemove }: PhotoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-4">
      <p className="text-sm font-body text-muted-foreground">
        Fotografija otvora nam pomaže da procenimo posao. Ovaj korak je opcioni — najviše {PHOTO_LIMITS.maxFiles} fotografije, do 5 MB svaka.
      </p>
      <input
        ref={inputRef}
        id="photos"
        type="file"
        accept={PHOTO_LIMITS.types.join(",")}
        multiple
        className="sr-only"
        aria-describedby={error ? "photos-error" : undefined}
        onChange={(e) => {
          onAdd(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />
      <Button type="button" variant="outline" className="gap-2" onClick={() => inputRef.current?.click()}>
        <ImagePlus size={16} /> Dodaj fotografije
      </Button>
      {files.length > 0 && (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="relative border border-border p-2">
              {f.type === "image/heic" || f.type === "image/heif" ? (
                <div className="flex aspect-[4/3] items-center justify-center bg-muted text-xs text-muted-foreground">HEIC</div>
              ) : (
                <PhotoPreview file={f} />
              )}
              <p className="mt-1 truncate text-xs text-muted-foreground">{f.name}</p>
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label={`Ukloni fotografiju ${f.name}`}
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center bg-background/90 border border-border hover:bg-muted"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <FieldError id="photos" message={error} />
    </div>
  );
};

const PhotoPreview = ({ file }: { file: File }) => {
  const url = useMemo(() => URL.createObjectURL(file), [file]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);
  return <img src={url} alt={`Pregled: ${file.name}`} className="aspect-[4/3] w-full object-cover" />;
};

export const StepContact = ({ data, errors, set, honeypotRef }: StepProps & { honeypotRef: React.RefObject<HTMLInputElement> }) => (
  <div className="space-y-5">
    <div className="grid sm:grid-cols-2 gap-5">
      <TextField id="name" label="Ime i prezime *" autoComplete="name" value={data.name} error={errors.name} onChange={(v) => set("name", v)} />
      <TextField id="phone" label="Telefon *" type="tel" autoComplete="tel" placeholder="+381 6X XXX XXXX" value={data.phone} error={errors.phone} onChange={(v) => set("phone", v)} />
      <TextField id="email" label="E-mail adresa *" type="email" autoComplete="email" placeholder="vas@email.com" value={data.email} error={errors.email} onChange={(v) => set("email", v)} />
      <TextField id="city" label="Mesto" autoComplete="address-level2" value={data.city} error={errors.city} onChange={(v) => set("city", v)} />
    </div>

    <ChoiceGroup name="contactMethod" legend="Željeni način kontakta" options={contactMethods} value={data.contactMethod} onChange={(v) => set("contactMethod", v)} error={errors.contactMethod} columns="grid-cols-3" />

    <div className="space-y-2">
      <Label htmlFor="note">Napomena</Label>
      <Textarea id="note" rows={3} value={data.note} onChange={(e) => set("note", e.target.value)} aria-invalid={!!errors.note} aria-describedby={errors.note ? "note-error" : undefined} placeholder="Dodatne informacije, željeni rok..." />
      <FieldError id="note" message={errors.note} />
    </div>

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
          i obradom podataka radi izrade ponude. *
        </Label>
      </div>
      <FieldError id="consent" message={errors.consent} />
    </div>
  </div>
);
