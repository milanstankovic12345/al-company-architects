import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import TechTooltip from "@/components/TechTooltip";
import { useComparison } from "@/contexts/ComparisonContext";
import { compareSystems, defaultCompareSlugs, type CompareSystem } from "@/data/compareSystems";

type Row = {
  label: string;
  tooltipKey?: string;
  best?: "min" | "max";
  value: (s: CompareSystem) => string | number;
  unit?: string;
};

const rows: Row[] = [
  { label: "Materijal", value: (s) => (s.category === "PVC" ? "PVC (GEALAN)" : "Aluminijum (ALUMIL)") },
  { label: "Dubina profila", value: (s) => s.frameDepth, unit: " mm" },
  { label: "Broj komora / termički prekid", tooltipKey: "chambers", value: (s) => s.chambers },
  { label: "Uf vrednost", tooltipKey: "uf", best: "min", value: (s) => s.uf, unit: " W/m²K" },
  { label: "Uw vrednost", tooltipKey: "uw", best: "min", value: (s) => s.uw, unit: " W/m²K" },
  { label: "Nivoi zaptivanja", tooltipKey: "sealing", best: "max", value: (s) => s.sealLevels },
  { label: "Maks. debljina stakla", best: "max", value: (s) => s.maxGlazing, unit: " mm" },
  { label: "Klasa sigurnosti", tooltipKey: "rc", value: (s) => s.securityClass },
  { label: "Zvučna izolacija", tooltipKey: "db", best: "max", value: (s) => s.soundInsulation, unit: " dB" },
  { label: "Pasivna kuća", value: (s) => (s.passiveHouse ? "Da" : "Ne") },
  { label: "Idealno za", value: (s) => s.idealUse },
];

const fmt = (v: string | number, unit = "") =>
  typeof v === "number" ? `${v.toLocaleString("sr-Latn-RS")}${unit}` : v;

const MAX_COLUMNS = 4;

const CompareTable = () => {
  const { selectedSlugs } = useComparison();
  // Seed from the shortlist (only systems that exist in this table), else defaults
  const [selected, setSelected] = useState<string[]>(() => {
    const fromShortlist = selectedSlugs.filter((s) => compareSystems.some((c) => c.slug === s));
    return fromShortlist.length >= 2 ? fromShortlist : defaultCompareSlugs;
  });

  const toggle = (slug: string) =>
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.length > 1
          ? prev.filter((s) => s !== slug)
          : prev
        : prev.length >= MAX_COLUMNS
        ? prev
        : [...prev, slug]
    );

  const columns = compareSystems.filter((s) => selected.includes(s.slug));

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="text-sm text-muted-foreground mb-3">
          Izaberite sisteme za poređenje (najviše {MAX_COLUMNS}):
        </legend>
        <div className="flex flex-wrap gap-2">
          {compareSystems.map((s) => {
            const on = selected.includes(s.slug);
            const disabled = !on && selected.length >= MAX_COLUMNS;
            return (
              <label
                key={s.slug}
                className={`flex items-center gap-2 border px-3 py-2 text-sm cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-ring ${
                  on ? "border-accent bg-accent/10 text-foreground" : "border-border text-muted-foreground"
                } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-accent"}`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  disabled={disabled}
                  onChange={() => toggle(s.slug)}
                />
                {on && <Check size={14} className="text-accent" aria-hidden />}
                {s.name}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="overflow-x-auto border border-border">
        <table className="w-full border-collapse min-w-[560px]">
          <caption className="sr-only">Poređenje PVC i aluminijumskih sistema</caption>
          <thead>
            <tr className="bg-muted">
              <th scope="col" className="sticky left-0 z-10 bg-muted p-3 text-left text-sm font-medium text-muted-foreground w-36 md:w-48">
                Karakteristika
              </th>
              {columns.map((s) => (
                <th key={s.slug} scope="col" className="p-3 text-center">
                  <div className="font-heading font-bold text-foreground text-sm">{s.name}</div>
                  <Badge variant="secondary" className="text-xs mt-1">{s.category}</Badge>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const nums = columns.map((s) => row.value(s)).filter((v): v is number => typeof v === "number");
              const best = row.best && nums.length ? (row.best === "min" ? Math.min(...nums) : Math.max(...nums)) : null;
              const zebra = i % 2 === 0 ? "bg-background" : "bg-muted/30";
              return (
                <tr key={row.label} className={`border-t border-border/50 ${zebra}`}>
                  <th scope="row" className={`sticky left-0 z-10 p-3 text-left text-sm font-medium text-muted-foreground ${zebra}`}>
                    {row.label}
                  </th>
                  {columns.map((s) => {
                    const v = row.value(s);
                    const display = fmt(v, row.unit);
                    const isBest = best !== null && columns.length > 1 && v === best && nums.some((n) => n !== best);
                    return (
                      <td key={s.slug} className="p-3 text-center text-sm">
                        <span className={isBest ? "font-semibold text-accent" : "text-foreground"}>
                          {row.tooltipKey && typeof v !== "undefined" && display !== "—" ? (
                            <TechTooltip value={display} tooltipKey={row.tooltipKey} />
                          ) : (
                            display
                          )}
                        </span>
                        {isBest && <Badge className="ml-2 text-[10px] bg-accent text-accent-foreground">Najbolji</Badge>}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">
        Vrednosti su okvirne i zavise od konfiguracije i stakla. Za tačnu ponudu{" "}
        <Link to="/ponuda" className="underline hover:text-foreground">zatražite ponudu</Link>.
      </p>
    </div>
  );
};

export default CompareTable;
