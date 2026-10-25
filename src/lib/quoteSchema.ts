import { z } from "zod";
import { contactMethods, finishes, materials, productTypes, PHOTO_LIMITS } from "@/data/quoteOptions";

const oneOf = (list: { value: string }[], message: string) =>
  z.string().refine((v) => list.some((o) => o.value === v), message);

const dim = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `Unesite ${label}`)
    .refine((v) => /^\d+$/.test(v), `${label[0].toUpperCase()}${label.slice(1)} unesite samo ciframa (u mm)`)
    .refine((v) => Number(v) >= 300 && Number(v) <= 6000, "Dimenzija mora biti između 300 i 6000 mm");

export const productSchema = z.object({
  product: oneOf(productTypes, "Izaberite tip proizvoda"),
});

export const materialSchema = z.object({
  material: oneOf(materials, "Izaberite materijal"),
});

export const dimensionsSchema = z.object({
  width: dim("širinu"),
  height: dim("visinu"),
  quantity: z
    .string()
    .trim()
    .min(1, "Unesite količinu")
    .refine((v) => /^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 99, "Količina mora biti od 1 do 99"),
});

export const finishSchema = z.object({
  finish: oneOf(finishes, "Izaberite boju ili obradu"),
  finishNote: z.string().trim().max(200, "Napomena može imati najviše 200 karaktera").optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Unesite ime i prezime (najmanje 2 karaktera)").max(100, "Ime može imati najviše 100 karaktera"),
  email: z
    .string()
    .trim()
    .min(1, "Unesite e-mail adresu")
    .email("Unesite ispravnu e-mail adresu")
    .max(255, "E-mail adresa može imati najviše 255 karaktera"),
  phone: z
    .string()
    .trim()
    .min(1, "Unesite broj telefona")
    .regex(/^\+?[0-9][0-9\s\-()/]{5,19}$/, "Unesite ispravan broj telefona, npr. +381 63 123 4567"),
  city: z.string().trim().max(100, "Mesto može imati najviše 100 karaktera").optional().or(z.literal("")),
  contactMethod: oneOf(contactMethods, "Izaberite željeni način kontakta"),
  note: z.string().trim().max(1000, "Napomena može imati najviše 1000 karaktera").optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Potrebna je saglasnost sa politikom privatnosti" }) }),
});

export type QuoteData = {
  product: string;
  material: string;
  width: string;
  height: string;
  quantity: string;
  finish: string;
  finishNote: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  contactMethod: string;
  note: string;
  consent: boolean;
};

export const emptyQuote: QuoteData = {
  product: "",
  material: "",
  width: "",
  height: "",
  quantity: "1",
  finish: "",
  finishNote: "",
  name: "",
  email: "",
  phone: "",
  city: "",
  contactMethod: "telefon",
  note: "",
  consent: false,
};

/** Schema per wizard step; the photo step (index 4) is validated separately by `validatePhotos`. */
export const stepSchemas = [productSchema, materialSchema, dimensionsSchema, finishSchema, null, contactSchema] as const;

export type FieldErrors = Partial<Record<keyof QuoteData | "photos", string>>;

export function validateStep(step: number, data: QuoteData): FieldErrors {
  const schema = stepSchemas[step];
  if (!schema) return {};
  const result = schema.safeParse(data);
  if (result.success) return {};
  const errors: FieldErrors = {};
  result.error.errors.forEach((err) => {
    const key = err.path[0] as keyof QuoteData;
    if (!errors[key]) errors[key] = err.message;
  });
  return errors;
}

export function validatePhotos(files: File[]): string | null {
  if (files.length > PHOTO_LIMITS.maxFiles) return `Možete priložiti najviše ${PHOTO_LIMITS.maxFiles} fotografije`;
  for (const f of files) {
    if (!PHOTO_LIMITS.types.includes(f.type)) return `„${f.name}“ nije podržan format (JPG, PNG, WebP ili HEIC)`;
    if (f.size > PHOTO_LIMITS.maxBytes) return `„${f.name}“ je veća od 5 MB`;
  }
  return null;
}
