import { assistantProducts, type AssistantProduct } from "@/data/assistantProducts";
import { products } from "@/data/products";

export interface CompareSystem extends AssistantProduct {
  chambers: string;
  idealUse: string;
}

// Main window systems shown in the /uporedi table (order = default column order)
const compareSlugs = [
  "gealan-s3000",
  "gealan-s8000-iq",
  "gealan-s9000",
  "alumil-m11000",
  "alumil-smartia-s67",
];

export const defaultCompareSlugs = ["gealan-s8000-iq", "alumil-smartia-s67"];

const idealUse: Record<string, string> = {
  "gealan-s3000": "Standardni prozori, veći projekti sa ograničenim budžetom",
  "gealan-s7000-iq": "Kuće i stanovi sa visokim zahtevima za zvučnu izolaciju",
  "gealan-s8000-iq": "Moderne kuće i stanovi, balans cene i performansi",
  "gealan-s9000": "Pasivne i energetski efikasne kuće",
  "alumil-m11000": "Prozori i balkonska vrata, klasična aluminijumska estetika",
  "alumil-smartia-s67": "Moderni objekti, tanki profili i puno svetla",
};

const specValue = (slug: string, label: string) =>
  products.find((p) => p.slug === slug)?.specs.find((s) => s.label === label)?.value;

export const compareSystems: CompareSystem[] = compareSlugs.flatMap((slug) => {
  const base = assistantProducts.find((p) => p.slug === slug);
  if (!base) return [];
  return [
    {
      ...base,
      chambers: specValue(slug, "Broj komora") ?? (specValue(slug, "Termički prekid") ? "Termički prekid" : "—"),
      idealUse: idealUse[slug] ?? specValue(slug, "Namena") ?? "—",
    },
  ];
});
