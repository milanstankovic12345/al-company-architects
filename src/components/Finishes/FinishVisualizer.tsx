import { useState } from "react";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { visualizerFinishes, type FinishGroup, type VisualizerFinish } from "@/data/finishes";
import { DEFAULT_FINISH_ID, getFinish, shade } from "@/lib/finishes";

const groupTitles: Record<FinishGroup, string> = {
  standard: "Standardne boje",
  drvodekor: "Drvodekor",
  acrylcolor: "Acrylcolor (RAL)",
};
const groupOrder: FinishGroup[] = ["standard", "drvodekor", "acrylcolor"];

const WindowPreview = ({ finish }: { finish: VisualizerFinish }) => {
  const base = finish.colorHex;
  const light = shade(base, 0.18);
  const dark = shade(base, -0.25);
  const sash = (x: number, handleX: number) => (
    <g>
      <rect x={x} y={44} width={118} height={272} fill={light} stroke={dark} strokeWidth={2} />
      <rect x={x + 14} y={58} width={90} height={244} fill="url(#glass)" stroke={dark} strokeWidth={2} />
      <rect x={handleX} y={170} width={5} height={30} rx={2} fill={shade(base, -0.45)} />
    </g>
  );

  return (
    <svg
      viewBox="0 0 300 360"
      role="img"
      aria-label={`Prikaz prozora u boji: ${finish.name}`}
      className="w-full max-w-sm mx-auto h-auto"
    >
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dbeaf3" />
          <stop offset="0.55" stopColor="#a9c9dc" />
          <stop offset="1" stopColor="#cfe2ee" />
        </linearGradient>
        <pattern id="grain" width="14" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 1 Q4 0 7 1 T14 1 M0 4.5 Q4 3.5 7 4.5 T14 4.5" fill="none" stroke="#000" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect x={6} y={340} width={288} height={10} fill="#00000014" />
      <g className="motion-safe:transition-colors motion-safe:duration-300">
        <rect x={20} y={20} width={260} height={320} fill={base} stroke={dark} strokeWidth={3} />
        {sash(30, 140)}
        {sash(152, 156)}
        {finish.wood && (
          <rect x={20} y={20} width={260} height={320} fill="url(#grain)" opacity={0.28} style={{ mixBlendMode: "multiply" }} pointerEvents="none" />
        )}
        <rect x={20} y={20} width={260} height={320} fill="none" stroke={shade(base, 0.35)} strokeWidth={1} opacity={0.6} />
      </g>
    </svg>
  );
};

const FinishVisualizer = () => {
  const [selectedId, setSelectedId] = useState(DEFAULT_FINISH_ID);
  const finish = getFinish(selectedId);

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      <div className="bg-card border border-border p-6 md:p-10 lg:sticky lg:top-28">
        <WindowPreview finish={finish} />
        <p className="text-center font-body text-sm text-muted-foreground mt-4" aria-live="polite">
          Izabrano: <span className="font-semibold text-foreground">{finish.name}</span>
        </p>
      </div>

      <div>
        <RadioGroup value={selectedId} onValueChange={setSelectedId} aria-label="Boja i dekor profila" className="gap-8">
          {groupOrder.map((group) => (
            <div key={group}>
              <h2 className="text-lg font-heading font-bold text-foreground mb-3">{groupTitles[group]}</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {visualizerFinishes
                  .filter((f) => f.group === group)
                  .map((f) => (
                    <div key={f.id} className="flex flex-col items-center gap-1.5">
                      <RadioGroupItem
                        id={`finish-${f.id}`}
                        value={f.id}
                        aria-label={f.name}
                        style={{ backgroundColor: f.colorHex }}
                        className="h-12 w-12 border-border [&>span]:hidden data-[state=checked]:ring-2 data-[state=checked]:ring-accent data-[state=checked]:ring-offset-2 hover:scale-105 motion-safe:transition-transform"
                      />
                      <Label htmlFor={`finish-${f.id}`} className="text-[11px] leading-tight text-center text-muted-foreground font-body cursor-pointer">
                        {f.name}
                      </Label>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </RadioGroup>

        <p className="font-body text-xs text-muted-foreground mt-8">
          Prikaz je ilustrativan – boje na ekranu mogu odstupati od stvarnih uzoraka. Uzorke možete videti na licu mesta.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Link to="/ponuda" className="bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90">
            Zatražite ponudu
          </Link>
          <Link to="/merenje" className="border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">
            Zakažite merenje
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinishVisualizer;
