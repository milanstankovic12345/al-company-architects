import manifest from "@/assets/generated/manifest.json";

// Variants are produced by `npm run images` (scripts/optimize-images.mjs).
const urls = import.meta.glob("/src/assets/generated/*.{webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

type Format = "avif" | "webp";

export interface ImageSet {
  width: number;
  height: number;
  src: string;
  srcSet: Record<Format, string>;
}

const entries = manifest as Record<string, { width: number; height: number; widths: number[] }>;

const buildSrcSet = (key: string, widths: number[], format: Format) =>
  widths.map((w) => `${urls[`/src/assets/generated/${key}-${w}.${format}`]} ${w}w`).join(", ");

/** Look up the generated variants for an image key (the slugified source file name). */
export function getImageSet(key: string): ImageSet | null {
  const entry = entries[key];
  if (!entry) return null;
  const largest = entry.widths[entry.widths.length - 1];
  return {
    width: entry.width,
    height: entry.height,
    src: urls[`/src/assets/generated/${key}-${largest}.webp`],
    srcSet: {
      avif: buildSrcSet(key, entry.widths, "avif"),
      webp: buildSrcSet(key, entry.widths, "webp"),
    },
  };
}
