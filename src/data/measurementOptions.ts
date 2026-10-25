// Options for the free measurement booking (/merenje).
// TODO: confirm service area, working days and time windows with the client.
import type { QuoteOption } from "@/data/quoteOptions";

export const OTHER_TOWN = "drugo";

export const towns: QuoteOption[] = [
  { value: "valjevo", label: "Valjevo" },
  { value: "lajkovac", label: "Lajkovac" },
  { value: "ljig", label: "Ljig" },
  { value: "mionica", label: "Mionica" },
  { value: "osecina", label: "Osečina" },
  { value: "ub", label: "Ub" },
  { value: "koceljeva", label: "Koceljeva" },
  { value: "sabac", label: "Šabac" },
  { value: "loznica", label: "Loznica" },
  { value: "obrenovac", label: "Obrenovac" },
  { value: OTHER_TOWN, label: "Drugo mesto" },
];

export const timeWindows: QuoteOption[] = [
  { value: "08-12", label: "08:00 – 12:00" },
  { value: "12-16", label: "12:00 – 16:00" },
  { value: "16-19", label: "16:00 – 19:00" },
  { value: "svejedno", label: "Svejedno" },
];

/** Earliest bookable day is tomorrow; no bookings further out than this. */
export const BOOKING_HORIZON_DAYS = 60;
