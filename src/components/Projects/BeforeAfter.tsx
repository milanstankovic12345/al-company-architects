import { useState } from "react";
import ResponsiveImage from "@/components/ResponsiveImage";

interface BeforeAfterProps {
  before: string;
  after: string;
  alt: string;
}

/** Image comparison; the range input makes it keyboard accessible (arrows, Home/End). */
const BeforeAfter = ({ before, after, alt }: BeforeAfterProps) => {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden select-none bg-muted focus-within:ring-2 focus-within:ring-inset focus-within:ring-accent">
      <ResponsiveImage name={after} alt={`${alt} – posle`} sizes="(min-width: 1024px) 896px, 100vw" className="h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <ResponsiveImage name={before} alt={`${alt} – pre`} sizes="(min-width: 1024px) 896px, 100vw" className="h-full w-full object-cover" />
      </div>
      <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white">Pre</span>
      <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white">Posle</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-black/50" />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Poređenje pre i posle"
        aria-valuetext={`${pos}% prikazano pre`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        // Swipes on the slider must not be taken over by the lightbox's swipe-to-navigate.
        onPointerDown={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default BeforeAfter;
