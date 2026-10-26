import { visualizerFinishes, type VisualizerFinish } from "@/data/finishes";

export const DEFAULT_FINISH_ID = "bela";

export const getFinish = (id: string): VisualizerFinish =>
  visualizerFinishes.find((f) => f.id === id) ??
  visualizerFinishes.find((f) => f.id === DEFAULT_FINISH_ID)!;

const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));

/** Lighten (amount > 0) or darken (amount < 0) a #rrggbb color; amount in -1..1. */
export const shade = (hex: string, amount: number): string => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    clamp(amount >= 0 ? c + (255 - c) * amount : c * (1 + amount)),
  );
  return `#${ch.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
};
