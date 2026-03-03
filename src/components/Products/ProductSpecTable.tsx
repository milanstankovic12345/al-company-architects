import TechTooltip from "@/components/TechTooltip";
import type { ProductSpec } from "@/data/products";

interface ProductSpecTableProps {
  specs: ProductSpec[];
}

const ProductSpecTable = ({ specs }: ProductSpecTableProps) => {
  return (
    <div className="border border-border overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-muted">
            <th className="text-left text-sm font-heading font-semibold text-foreground px-6 py-3">
              Parametar
            </th>
            <th className="text-left text-sm font-heading font-semibold text-foreground px-6 py-3">
              Vrednost
            </th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, i) => (
            <tr
              key={spec.label}
              className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}
            >
              <td className="px-6 py-4 text-sm font-body text-muted-foreground">
                {spec.label}
              </td>
              <td className="px-6 py-4 text-sm font-body font-medium text-foreground">
                <TechTooltip value={spec.value} tooltipKey={spec.tooltipKey} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecTable;
