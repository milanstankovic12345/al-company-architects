import { Check, Minus } from "lucide-react";

const rows = [
  { label: "Toplotna izolacija", pvc: true, alu: false },
  { label: "Cena", pvc: true, alu: false },
  { label: "Estetika i dizajn", pvc: false, alu: true },
  { label: "Veliki stakleni otvori", pvc: false, alu: true },
  { label: "Održavanje", pvc: true, alu: true },
];

const ComparisonWidget = () => {
  return (
    <div className="border border-border bg-card">
      <div className="p-6 md:p-8 border-b border-border">
        <h3 className="font-heading font-bold text-xl text-foreground">
          PVC vs Aluminijum — Koji sistem je pravi za vas?
        </h3>
        <p className="font-body text-sm text-muted-foreground mt-2">
          Oba materijala imaju svoje prednosti. Uporedite ih i donesite informisanu odluku.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="bg-muted">
              <th className="text-left px-6 py-4 font-heading font-semibold text-sm text-foreground">
                Karakteristika
              </th>
              <th className="text-center px-6 py-4 font-heading font-semibold text-sm text-foreground">
                PVC (GEALAN)
              </th>
              <th className="text-center px-6 py-4 font-heading font-semibold text-sm text-foreground">
                ALU (ALUMIL)
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                <td className="px-6 py-4 text-sm font-body text-foreground">
                  {row.label}
                </td>
                <td className="px-6 py-4 text-center">
                  {row.pvc ? (
                    <Check className="inline text-accent" size={20} />
                  ) : (
                    <Minus className="inline text-muted-foreground/40" size={20} />
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {row.alu ? (
                    <Check className="inline text-accent" size={20} />
                  ) : (
                    <Minus className="inline text-muted-foreground/40" size={20} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonWidget;
