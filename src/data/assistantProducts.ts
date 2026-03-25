export type BuildingType = "house" | "wholeBuilding" | "singleApartment";
export type AestheticStyle = "modern" | "classic" | "industrial";
import { products, type ProductCategory } from "@/data/products";

export interface AssistantProduct {
  slug: string;
  name: string;
  category: "PVC" | "ALU";
  frameDepth: number;
  uf: number;
  uw: number;
  maxGlazing: number;
  securityClass: string;
  soundInsulation: number;
  sealLevels: number;
  passiveHouse: boolean;
  aestheticStyle: AestheticStyle;
  image: string;
  subsidyEligible: boolean;
  suitableFor: BuildingType[];
}

interface AssistantProductMetrics {
  slug: string;
  frameDepth: number;
  uf: number;
  uw: number;
  maxGlazing: number;
  securityClass: string;
  soundInsulation: number;
  sealLevels: number;
  passiveHouse: boolean;
  aestheticStyle: AestheticStyle;
  subsidyEligible: boolean;
  suitableFor: BuildingType[];
}

const assistantProductMetrics: AssistantProductMetrics[] = [
  {
    slug: "gealan-s9000",
    frameDepth: 82.5,
    uf: 0.92,
    uw: 0.73,
    maxGlazing: 58,
    securityClass: "RC2",
    soundInsulation: 47,
    sealLevels: 3,
    passiveHouse: true,
    aestheticStyle: "classic",
    subsidyEligible: true,
    suitableFor: ["house", "wholeBuilding", "singleApartment"],
  },
  {
    slug: "gealan-s7000-iq",
    frameDepth: 82.5,
    uf: 0.95,
    uw: 0.78,
    maxGlazing: 56,
    securityClass: "RC2",
    soundInsulation: 47,
    sealLevels: 3,
    passiveHouse: true,
    aestheticStyle: "classic",
    subsidyEligible: true,
    suitableFor: ["house", "wholeBuilding", "singleApartment"],
  },
  {
    slug: "gealan-s8000-iq",
    frameDepth: 74,
    uf: 1.0,
    uw: 0.85,
    maxGlazing: 52,
    securityClass: "RC2",
    soundInsulation: 45,
    sealLevels: 3,
    passiveHouse: false,
    aestheticStyle: "modern",
    subsidyEligible: true,
    suitableFor: ["house", "wholeBuilding", "singleApartment"],
  },
  {
    slug: "gealan-linear",
    frameDepth: 74,
    uf: 1.0,
    uw: 0.85,
    maxGlazing: 52,
    securityClass: "RC1",
    soundInsulation: 47,
    sealLevels: 3,
    passiveHouse: false,
    aestheticStyle: "modern",
    subsidyEligible: true,
    suitableFor: ["house", "singleApartment"],
  },
  {
    slug: "gealan-s3000",
    frameDepth: 58,
    uf: 1.6,
    uw: 1.3,
    maxGlazing: 36,
    securityClass: "RC1",
    soundInsulation: 38,
    sealLevels: 2,
    passiveHouse: false,
    aestheticStyle: "classic",
    subsidyEligible: true,
    suitableFor: ["house", "wholeBuilding", "singleApartment"],
  },
  {
    slug: "alumil-smartia-s67",
    frameDepth: 67,
    uf: 1.1,
    uw: 0.95,
    maxGlazing: 52,
    securityClass: "RC1",
    soundInsulation: 42,
    sealLevels: 2,
    passiveHouse: false,
    aestheticStyle: "modern",
    subsidyEligible: true,
    suitableFor: ["house", "wholeBuilding", "singleApartment"],
  },
  {
    slug: "alumil-supreme-sd77",
    frameDepth: 77,
    uf: 1.3,
    uw: 0.9,
    maxGlazing: 56,
    securityClass: "RC3",
    soundInsulation: 45,
    sealLevels: 3,
    passiveHouse: true,
    aestheticStyle: "modern",
    subsidyEligible: true,
    suitableFor: ["house", "wholeBuilding"],
  },
  {
    slug: "alumil-m11000",
    frameDepth: 60,
    uf: 1.8,
    uw: 1.5,
    maxGlazing: 44,
    securityClass: "RC1",
    soundInsulation: 35,
    sealLevels: 2,
    passiveHouse: false,
    aestheticStyle: "industrial",
    subsidyEligible: false,
    suitableFor: ["house", "wholeBuilding", "singleApartment"],
  },
];

const productsBySlug = new Map(products.map((product) => [product.slug, product]));

export const assistantProducts: AssistantProduct[] = assistantProductMetrics.map((item) => {
  const baseProduct = productsBySlug.get(item.slug);

  return {
    ...item,
    name: baseProduct?.name ?? item.slug,
    category: (baseProduct?.category as ProductCategory | undefined) ?? "PVC",
    image: baseProduct?.heroImage ?? "/placeholder.svg",
  };
});

// Security class to numeric rank for scoring
export const securityRank: Record<string, number> = {
  "N/A": 0,
  RC1: 1,
  RC2: 2,
  RC3: 3,
};
