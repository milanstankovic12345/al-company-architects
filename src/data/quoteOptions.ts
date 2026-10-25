// Options for the quote wizard (/ponuda). TODO: confirm product and finish lists with the client.

export interface QuoteOption {
  value: string;
  label: string;
  desc?: string;
}

export const productTypes: QuoteOption[] = [
  { value: "prozor", label: "Prozor", desc: "Jednokrilni, dvokrilni, fiksni ili kip prozori." },
  { value: "balkonska-vrata", label: "Balkonska vrata", desc: "Balkonska i terasna vrata sa ili bez bočnog stakla." },
  { value: "ulazna-vrata", label: "Ulazna vrata", desc: "Ulazna vrata za kuće i stanove." },
  { value: "klizni-sistem", label: "Klizni sistem", desc: "Klizna i podizno-klizna vrata i zidovi." },
  { value: "roletne-komarnici", label: "Roletne i komarnici", desc: "Roletne, komarnici i senčila." },
];

export const materials: QuoteOption[] = [
  { value: "pvc", label: "PVC", desc: "GEALAN profili, odlična toplotna izolacija." },
  { value: "alu", label: "Aluminijum", desc: "ALUMIL profili, vitke linije i velike površine." },
  { value: "nesiguran", label: "Nisam siguran/na", desc: "Savetovaćemo vas u razgovoru." },
];

export const finishes: QuoteOption[] = [
  { value: "bela", label: "Bela" },
  { value: "antracit", label: "Antracit" },
  { value: "zlatni-hrast", label: "Zlatni hrast" },
  { value: "orah", label: "Orah" },
  { value: "acrylcolor", label: "Acrylcolor" },
  { value: "ostalo", label: "Drugo / nisam siguran/na" },
];

export const finishSwatches: Record<string, string> = {
  bela: "#FFFFFF",
  antracit: "#383838",
  "zlatni-hrast": "#D4A54A",
  orah: "#614126",
  acrylcolor: "linear-gradient(135deg,#830D12,#383838)",
  ostalo: "#D4D4D4",
};

export const contactMethods: QuoteOption[] = [
  { value: "telefon", label: "Telefon" },
  { value: "email", label: "E-mail" },
  { value: "viber", label: "Viber" },
];

export const labelOf = (list: QuoteOption[], value: string) =>
  list.find((o) => o.value === value)?.label ?? value;

export const PHOTO_LIMITS = {
  maxFiles: 3,
  maxBytes: 5 * 1024 * 1024,
  types: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
};
