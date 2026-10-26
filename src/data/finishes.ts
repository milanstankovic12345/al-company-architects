export interface WoodDecor {
  name: string;
  colorHex: string;
}

export interface FinishCategory {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export const drvodekorColors: WoodDecor[] = [
  { name: "Oregon IV", colorHex: "#C4813D" },
  { name: "Zlatni hrast", colorHex: "#D4A54A" },
  { name: "Hrast", colorHex: "#B89A6A" },
  { name: "Mahagoni", colorHex: "#6B2A2A" },
  { name: "Tamni hrast", colorHex: "#5C4033" },
  { name: "Lešnik", colorHex: "#8B6914" },
  { name: "Orah", colorHex: "#614126" },
  { name: "Trešnja", colorHex: "#8B4513" },
  { name: "Bordo", colorHex: "#722F37" },
  { name: "Antracit sivi", colorHex: "#383838" },
  { name: "Nussbaum", colorHex: "#6E4B3A" },
  { name: "Winchester", colorHex: "#704214" },
  { name: "Crni hrast", colorHex: "#3B3131" },
  { name: "Beli hrast", colorHex: "#D8C9A3" },
  { name: "Srebrni sivi", colorHex: "#A8A9AD" },
  { name: "Bazalt sivi", colorHex: "#646464" },
  { name: "Bor", colorHex: "#C9A96E" },
  { name: "Rustik hrast", colorHex: "#A0764A" },
  { name: "Stavert", colorHex: "#7A6652" },
  { name: "Golden Oak", colorHex: "#DAA520" },
];

/** Common RAL colors for window profiles (Acrylcolor) */
export const ralSwatches: WoodDecor[] = [
  { name: "Bela (RAL 9016)", colorHex: "#F7F7F2" },
  { name: "Antracit siva (RAL 7016)", colorHex: "#383E42" },
  { name: "Braon (RAL 8014)", colorHex: "#4A3526" },
  { name: "Bež (RAL 1015)", colorHex: "#E6D2B5" },
  { name: "Tamno zelena (RAL 6009)", colorHex: "#27352A" },
  { name: "Srebrno siva (RAL 9006)", colorHex: "#A5A5A5" },
  { name: "Crna (RAL 9005)", colorHex: "#0E0E10" },
  { name: "Krem bela (RAL 9001)", colorHex: "#F2EAD7" },
];

export type FinishGroup = "standard" | "drvodekor" | "acrylcolor";

export interface VisualizerFinish {
  id: string;
  name: string;
  colorHex: string;
  group: FinishGroup;
  /** wood decors get a grain overlay in the preview */
  wood: boolean;
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const standardNames = ["Bela (RAL 9016)", "Antracit siva (RAL 7016)"];

export const visualizerFinishes: VisualizerFinish[] = [
  ...ralSwatches
    .filter((s) => standardNames.includes(s.name))
    .map((s) => ({
      id: s.name.startsWith("Bela") ? "bela" : "antracit",
      name: s.name.startsWith("Bela") ? "Bela" : "Antracit",
      colorHex: s.colorHex,
      group: "standard" as const,
      wood: false,
    })),
  ...drvodekorColors.map((d) => ({
    id: `dekor-${slug(d.name)}`,
    name: d.name,
    colorHex: d.colorHex,
    group: "drvodekor" as const,
    wood: true,
  })),
  ...ralSwatches
    .filter((s) => !standardNames.includes(s.name))
    .map((s) => ({
      id: `ral-${slug(s.name)}`,
      name: s.name,
      colorHex: s.colorHex,
      group: "acrylcolor" as const,
      wood: false,
    })),
];

export const finishCategories: FinishCategory[] = [
  {
    id: "drvodekor",
    title: "Drvodekor",
    description:
      "Pored standardne ponude belih profila nudimo Vam i prozore u boji drveta. Kupovinom prozora sa drvo dekorom napravićete pravi izbor. Oni se preporučuju kao klasičan stilski element prilikom rekonstrukcije starih kuća i zgrada, a isto tako se uklapaju u prirodni pejzaž. AL COMPANY Vam nudi preko dvadeset različitih drvo dekora.",
    features: [
      "Preko 20 različitih dekora",
      "Autentičan izgled drveta",
      "Otpornost na UV zrake i vremenske uslove",
      "Idealno za rekonstrukcije starih objekata",
      "Uklapanje u prirodni pejzaž",
      "Jednostavno održavanje",
    ],
  },
  {
    id: "acrylcolor",
    title: "Acrylcolor",
    description:
      "Acrylcolor tehnologija predstavlja koekstrudirani akrilni sloj koji se trajno spaja sa PVC profilom tokom proizvodnje. Za razliku od folije, boja je integrisana u sam materijal profila, što obezbeđuje izuzetnu otpornost na UV zrake, grebanje i atmosferske uticaje. Profili zadržavaju svežinu boje decenijama.",
    features: [
      "Integrisana boja – nije folija",
      "Koekstrudirani akrilni sloj",
      "Izuzetna UV otpornost",
      "Otpornost na grebanje",
      "Boja ne bledi tokom vremena",
      "Lako održavanje – čisti se kao standardni PVC",
    ],
  },
];
