import { useState } from "react";
import { s9000Hotspots, type ProfileHotspot } from "@/data/profileSections";
import { cn } from "@/lib/utils";

type HotspotId = ProfileHotspot["id"];

const ProfileCrossSection = () => {
  const [activeId, setActiveId] = useState<HotspotId>("chambers");
  const active = s9000Hotspots.find((h) => h.id === activeId) ?? s9000Hotspots[0];
  const stroke = (id: HotspotId) => (activeId === id ? "stroke-accent" : "stroke-foreground/60");
  const dim = (id: HotspotId) => cn("transition-opacity", activeId === id ? "opacity-100" : "opacity-70");

  return (
    <section aria-labelledby="profile-section-title" className="mt-12">
      <h2 id="profile-section-title" className="text-2xl font-heading font-black text-foreground mb-2">
        Presek profila
      </h2>
      <p className="font-body text-muted-foreground max-w-xl mb-6">
        Izaberite tačku na preseku da vidite šta u profilu štiti vaš dom.
      </p>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="relative max-w-md mx-auto w-full border border-border bg-muted/40">
          <svg
            viewBox="0 0 320 260"
            className="w-full h-auto block"
            role="img"
            aria-labelledby="profile-svg-title profile-svg-desc"
          >
            <title id="profile-svg-title">Šematski presek GEALAN S-9000 profila</title>
            <desc id="profile-svg-desc">
              Okvir sa šest komora, čeličnim ojačanjem u glavnoj komori, zaptivkama i staklenim paketom sa desne strane.
            </desc>
            <rect x="30" y="30" width="170" height="200" className="fill-background stroke-foreground" strokeWidth="2" />

            <g className={dim("chambers")} strokeWidth="1.5">
              <rect x="38" y="38" width="40" height="90" className={cn("fill-muted", stroke("chambers"))} />
              <rect x="38" y="132" width="40" height="90" className={cn("fill-muted", stroke("chambers"))} />
              <rect x="84" y="38" width="52" height="184" className={cn("fill-muted", stroke("chambers"))} />
              <rect x="142" y="38" width="50" height="62" className={cn("fill-muted", stroke("chambers"))} />
              <rect x="142" y="104" width="50" height="60" className={cn("fill-muted", stroke("chambers"))} />
              <rect x="142" y="168" width="50" height="54" className={cn("fill-muted", stroke("chambers"))} />
            </g>

            <g className={dim("steel")}>
              <rect x="94" y="60" width="32" height="140" strokeWidth="2" className={cn("fill-foreground/30", stroke("steel"))} />
            </g>

            <g className={dim("seals")}>
              <rect x="18" y="116" width="12" height="28" rx="4" className="fill-foreground" />
              <circle cx="207" cy="44" r="6" className="fill-foreground" />
              <circle cx="207" cy="216" r="6" className="fill-foreground" />
              {activeId === "seals" && (
                <g className="fill-none stroke-accent" strokeWidth="2">
                  <rect x="16" y="114" width="16" height="32" rx="5" />
                  <circle cx="207" cy="44" r="9" />
                  <circle cx="207" cy="216" r="9" />
                </g>
              )}
            </g>

            <g className={dim("glass")}>
              {[215, 235, 255].map((x) => (
                <rect key={x} x={x} y="56" width="8" height="148" strokeWidth="2" className={cn("fill-primary/15", stroke("glass"))} />
              ))}
              <rect x="215" y="52" width="48" height="4" className="fill-foreground/60" />
              <rect x="215" y="204" width="48" height="4" className="fill-foreground/60" />
            </g>

            <text x="30" y="250" className="fill-muted-foreground" fontSize="10">
              ← unutra
            </text>
            <text x="263" y="250" textAnchor="end" className="fill-muted-foreground" fontSize="10">
              spolja →
            </text>
          </svg>

          {s9000Hotspots.map((h) => (
            <button
              key={h.id}
              type="button"
              aria-label={h.label}
              aria-pressed={activeId === h.id}
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
                  activeId === h.id ? "scale-125 motion-safe:animate-pulse" : "group-hover:scale-110",
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
