import { useState } from "react";
import { profileSections, type HotspotId } from "@/data/profileSections";
import { cn } from "@/lib/utils";

const GAP = 4;
const TOP = 38;
const HEIGHT = 184;

// n equal cells stacked in the 184-unit frame height
const stack = (n: number) => {
  const h = (HEIGHT - GAP * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => ({ y: TOP + i * (h + GAP), h }));
};

interface DrawingProps {
  activeId: HotspotId;
  chambers: number;
  seals: number;
  depth?: string;
}

const useStyles = (activeId: HotspotId) => ({
  stroke: (id: HotspotId) => (activeId === id ? "stroke-accent" : "stroke-foreground/60"),
  dim: (id: HotspotId) => cn("transition-opacity", activeId === id ? "opacity-100" : "opacity-70"),
});

const Glass = ({ activeId }: { activeId: HotspotId }) => {
  const { stroke, dim } = useStyles(activeId);
  return (
    <g className={dim("glass")}>
      {[215, 235, 255].map((x) => (
        <rect key={x} x={x} y="56" width="8" height="148" strokeWidth="2" className={cn("fill-primary/15", stroke("glass"))} />
      ))}
      <rect x="215" y="52" width="48" height="4" className="fill-foreground/60" />
      <rect x="215" y="204" width="48" height="4" className="fill-foreground/60" />
    </g>
  );
};

const Labels = ({ depth }: { depth?: string }) => (
  <>
    <text x="30" y="250" className="fill-muted-foreground" fontSize="10">
      ← unutra
    </text>
    {depth && (
      <text x="115" y="250" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
        {depth}
      </text>
    )}
    <text x="263" y="250" textAnchor="end" className="fill-muted-foreground" fontSize="10">
      spolja →
    </text>
  </>
);

const PvcDrawing = ({ activeId, chambers, seals, depth }: DrawingProps) => {
  const { stroke, dim } = useStyles(activeId);
  const others = Math.max(chambers - 1, 0); // one tall chamber holds the steel
  const left = stack(Math.floor(others / 2));
  const right = stack(Math.ceil(others / 2));
  const cell = (x: number, w: number, c: { y: number; h: number }, key: string) => (
    <rect key={key} x={x} y={c.y} width={w} height={c.h} className={cn("fill-muted", stroke("chambers"))} />
  );
  const rings = [
    seals >= 3 && { x: 24, y: 130, kind: "rect" as const },
    { x: 207, y: 44, kind: "circle" as const },
    { x: 207, y: 216, kind: "circle" as const },
  ].filter(Boolean) as { x: number; y: number; kind: "rect" | "circle" }[];

  return (
    <>
      <rect x="30" y="30" width="170" height="200" className="fill-background stroke-foreground" strokeWidth="2" />
      <g className={dim("chambers")} strokeWidth="1.5">
        {left.map((c, i) => cell(38, 40, c, `l${i}`))}
        <rect x="84" y="38" width="52" height="184" className={cn("fill-muted", stroke("chambers"))} />
        {right.map((c, i) => cell(142, 50, c, `r${i}`))}
      </g>
      <g className={dim("steel")}>
        <rect x="94" y="60" width="32" height="140" strokeWidth="2" className={cn("fill-foreground/30", stroke("steel"))} />
      </g>
      <g className={dim("seals")}>
        {rings.map((r) =>
          r.kind === "rect" ? (
            <g key="gasket">
              <rect x="18" y="116" width="12" height="28" rx="4" className="fill-foreground" />
              {activeId === "seals" && (
                <rect x="16" y="114" width="16" height="32" rx="5" className="fill-none stroke-accent" strokeWidth="2" />
              )}
            </g>
          ) : (
            <g key={r.y}>
              <circle cx={r.x} cy={r.y} r="6" className="fill-foreground" />
              {activeId === "seals" && <circle cx={r.x} cy={r.y} r="9" className="fill-none stroke-accent" strokeWidth="2" />}
            </g>
          ),
        )}
      </g>
      <Glass activeId={activeId} />
      <Labels depth={depth} />
    </>
  );
};

const AluDrawing = ({ activeId }: DrawingProps) => {
  const { stroke, dim } = useStyles(activeId);
  return (
    <>
      <g className={dim("shells")}>
        <rect x="30" y="30" width="80" height="200" strokeWidth="2" className={cn("fill-muted", stroke("shells"))} />
        <rect x="42" y="42" width="56" height="176" className="fill-background stroke-foreground/40" strokeWidth="1" />
        <rect x="120" y="30" width="80" height="200" strokeWidth="2" className={cn("fill-muted", stroke("shells"))} />
        <rect x="132" y="42" width="56" height="176" className="fill-background stroke-foreground/40" strokeWidth="1" />
      </g>
      <g className={dim("thermalbreak")}>
        <rect x="106" y="50" width="18" height="36" strokeWidth="2" className={cn("fill-accent/40", stroke("thermalbreak"))} />
        <rect x="106" y="174" width="18" height="36" strokeWidth="2" className={cn("fill-accent/40", stroke("thermalbreak"))} />
      </g>
      <Glass activeId={activeId} />
      <Labels />
    </>
  );
};

const ProfileCrossSection = ({ slug }: { slug: string }) => {
  const section = profileSections[slug];
  const [activeId, setActiveId] = useState<HotspotId | null>(null);
  if (!section) return null;

  const active = section.hotspots.find((h) => h.id === activeId) ?? section.hotspots[0];
  const Drawing = section.kind === "pvc" ? PvcDrawing : AluDrawing;

  return (
    <section aria-labelledby="profile-section-title" className="mt-12">
      <h2 id="profile-section-title" className="text-2xl font-heading font-black text-foreground mb-2">
        Presek profila
      </h2>
      <p className="font-body text-muted-foreground max-w-xl mb-6">
        Izaberite tačku na preseku da vidite šta u profilu {section.name} štiti vaš dom.
      </p>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="relative max-w-md mx-auto w-full border border-border bg-muted/40">
          <svg
            viewBox="0 0 320 260"
            className="w-full h-auto block"
            role="img"
            aria-labelledby="profile-svg-title profile-svg-desc"
          >
            <title id="profile-svg-title">Šematski presek profila {section.name}</title>
            <desc id="profile-svg-desc">
              {section.hotspots.map((h) => h.label).join(", ")}. Izaberite tačku za objašnjenje.
            </desc>
            <Drawing activeId={active.id} chambers={section.chambers} seals={section.seals} depth={section.depth} />
          </svg>

          {section.hotspots.map((h) => (
            <button
              key={h.id}
              type="button"
              aria-label={h.label}
              aria-pressed={active.id === h.id}
              aria-describedby="profile-hotspot-panel"
              onMouseEnter={() => setActiveId(h.id)}
              onFocus={() => setActiveId(h.id)}
              onClick={() => setActiveId(h.id)}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              className="group absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span
                className={cn(
                  "block w-4 h-4 rounded-full border-2 border-background bg-accent shadow transition-transform",
                  active.id === h.id ? "scale-125 motion-safe:animate-pulse" : "group-hover:scale-110",
                )}
              />
            </button>
          ))}
        </div>

        <div id="profile-hotspot-panel" aria-live="polite" className="border border-border p-5">
          <p className="text-accent font-semibold text-xs tracking-[0.2em] uppercase mb-2">{active.label}</p>
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">{active.title}</h3>
          <p className="font-body text-muted-foreground text-sm leading-relaxed">{active.description}</p>
          <p className="font-body text-xs text-muted-foreground/80 mt-4">
            Šematski prikaz, nije tehnički crtež proizvođača.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileCrossSection;
