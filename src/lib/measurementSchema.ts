import { z } from "zod";
import { contactMethods } from "@/data/quoteOptions";
import { BOOKING_HORIZON_DAYS, OTHER_TOWN, timeWindows, towns } from "@/data/measurementOptions";
import { consentField, emailField, nameField, phoneField } from "@/lib/quoteSchema";

export type MeasurementData = {
  town: string;
  otherTown: string;
  address: string;
  date: string; // YYYY-MM-DD from <input type="date">
  timeWindow: string;
  name: string;
  phone: string;
  email: string;
  contactMethod: string;
  note: string;
  consent: boolean;
};

export const emptyMeasurement: MeasurementData = {
  town: "",
  otherTown: "",
  address: "",
  date: "",
  timeWindow: "svejedno",
  name: "",
  phone: "",
  email: "",
  contactMethod: "telefon",
  note: "",
  consent: false,
};

export type MeasurementErrors = Partial<Record<keyof MeasurementData, string>>;

const oneOf = (list: { value: string }[], message: string) =>
  z.string().refine((v) => list.some((o) => o.value === v), message);

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const addDays = (d: Date, n: number) => {
  const copy = startOfDay(d);
  copy.setDate(copy.getDate() + n);
  return copy;
};

const toIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Bookable range as ISO strings, for the date input's min/max. */
export const bookingRange = (now: Date = new Date()) => ({
  min: toIso(addDays(now, 1)),
  max: toIso(addDays(now, BOOKING_HORIZON_DAYS)),
});

/** Returns an error message for a YYYY-MM-DD date, or null when it can be booked. */
export function validateDate(value: string, now: Date = new Date()): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return "Izaberite željeni datum";
  const [, y, m, d] = match.map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return "Izaberite ispravan datum";
  const { min, max } = bookingRange(now);
  if (value < min) return "Izaberite datum od sutra nadalje";
  if (value > max) return `Merenje možete zakazati najviše ${BOOKING_HORIZON_DAYS} dana unapred`;
  if (date.getDay() === 0) return "Nedeljom ne vršimo merenje — izaberite drugi dan";
  return null;
}

const schema = z
  .object({
    town: oneOf(towns, "Izaberite mesto"),
    otherTown: z.string().trim().max(100, "Mesto može imati najviše 100 karaktera"),
    address: z.string().trim().max(150, "Adresa može imati najviše 150 karaktera"),
    timeWindow: oneOf(timeWindows, "Izaberite vremenski period"),
    name: nameField,
    phone: phoneField,
    email: emailField,
    contactMethod: oneOf(contactMethods, "Izaberite željeni način kontakta"),
    note: z.string().trim().max(1000, "Napomena može imati najviše 1000 karaktera"),
    consent: consentField,
  })
  .superRefine((v, ctx) => {
    if (v.town === OTHER_TOWN && v.otherTown.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["otherTown"], message: "Upišite naziv mesta" });
    }
  });

export function validateMeasurement(data: MeasurementData, now: Date = new Date()): MeasurementErrors {
  const errors: MeasurementErrors = {};
  const result = schema.safeParse(data);
  if (!result.success) {
    result.error.errors.forEach((err) => {
      const key = err.path[0] as keyof MeasurementData;
      if (!errors[key]) errors[key] = err.message;
    });
  }
  const dateError = validateDate(data.date, now);
  if (dateError) errors.date = dateError;
  return errors;
}
