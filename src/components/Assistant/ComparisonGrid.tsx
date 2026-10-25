import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import TechTooltip from "@/components/TechTooltip";
import { assistantProducts, type AssistantProduct } from "@/data/assistantProducts";

interface ComparisonGridProps {
  slugs: string[];
}

const ComparisonGrid = ({ slugs }: ComparisonGridProps) => {
  const [glassThickness, setGlassThickness] = useState(44);
  const products = useMemo(
    () => slugs.map((s) => assistantProducts.find((p) => p.slug === s)).filter(Boolean) as AssistantProduct[],
    [slugs]
  );

  if (products.length === 0) return null;

  const rows: { label: string; key: keyof AssistantProduct; tooltipKey?: string; unit?: string; lowerBetter?: boolean }[] = [
    { label: "Dubina profila", key: "frameDepth", unit: " mm" },
    { label: "Uf vrednost", key: "uf", tooltipKey: "uf", unit: " W/m²K", lowerBetter: true },
    { label: "Uw vrednost", key: "uw", tooltipKey: "uw", unit: " W/m²K", lowerBetter: true },
    { label: "Maks. staklo", key: "maxGlazing", unit: " mm" },
    { label: "Klasa sigurnosti", key: "securityClass", tooltipKey: "rc" },
    { label: "Zvučna izolacija", key: "soundInsulation", tooltipKey: "db", unit: " dB" },
  ];

  const getBest = (key: keyof AssistantProduct, lowerBetter?: boolean) => {
    const vals = products.map((p) => Number(p[key]) || 0);
    const best = lowerBetter ? Math.min(...vals) : Math.max(...vals);
    return best;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-2">
        <label className="text-sm text-muted-foreground">Debljina stakla za proveru kompatibilnosti:</label>
        <select
          value={glassThickness}
          onChange={(e) => setGlassThickness(Number(e.target.value))}
          className="border border-input bg-background px-3 py-1.5 text-sm"
        >
          {[36, 40, 44, 48, 52, 56, 58].map((v) => (
            <option key={v} value={v}>{v} mm</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 text-left text-sm font-medium text-muted-foreground w-40" />
              {products.map((p) => (
                <th key={p.slug} className="p-3 text-center">
                  <div className="font-heading font-bold text-foreground text-sm">{p.name}</div>
                  <Badge variant="secondary" className="text-xs mt-1">{p.category}</Badge>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const best = getBest(row.key, row.lowerBetter);
              return (
                <tr key={row.key} className="border-b border-border/50">
                  <td className="p-3 text-sm font-medium text-muted-foreground">{row.label}</td>
                  {products.map((p) => {
                    const val = p[row.key];
                    const numVal = Number(val) || 0;
                    const isBest = products.length > 1 && numVal === best && typeof val === "number";
                    const display = typeof val === "number" ? `${val.toLocaleString("sr-Latn-RS")}${row.unit || ""}` : String(val);

                    return (
                      <td key={p.slug} className="p-3 text-center text-sm">
                        <span className={isBest ? "font-semibold text-accent" : "text-foreground"}>
                          {row.tooltipKey ? (
                            <TechTooltip value={display} tooltipKey={row.tooltipKey} />
                          ) : (
                            display
                          )}
                        </span>
                        {isBest && products.length > 1 && (
                          <Badge className="ml-2 text-[10px] bg-accent text-accent-foreground">Najbolji</Badge>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Compatibility warnings */}
      {products.some((p) => p.maxGlazing < glassThickness) && (
        <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/30 text-sm">
          <AlertTriangle size={18} className="text-destructive shrink-0 mt-0.5" />
          <div>
            <strong>Upozorenje na kompatibilnost:</strong>{" "}
            {products
              .filter((p) => p.maxGlazing < glassThickness)
              .map((p) => p.name)
              .join(", ")}{" "}
            ne podržava staklo debljine {glassThickness} mm.
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonGrid;
