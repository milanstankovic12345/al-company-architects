import ResponsiveImage from "@/components/ResponsiveImage";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { getProductImageAlt, type Product } from "@/data/products";
import TechTooltip from "@/components/TechTooltip";
import { ArrowRight, Plus, Check } from "lucide-react";
import { useComparison } from "@/contexts/ComparisonContext";
import { assistantProducts } from "@/data/assistantProducts";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const keySpec = product.specs[0];
  const { addProduct, removeProduct, isSelected } = useComparison();
  const hasAssistantData = assistantProducts.some((p) => p.slug === product.slug);
  const selected = isSelected(product.slug);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selected) removeProduct(product.slug);
    else addProduct(product.slug);
  };
  return (
    <Link
      to={`/proizvodi/${product.slug}`}
      className="group border border-border bg-card hover:border-accent/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10 motion-reduce:hover:translate-y-0 transition-all duration-300 flex flex-col"
    >
      <div className="w-[300px] h-[300px] max-w-full mx-auto bg-muted overflow-hidden relative">
        <ResponsiveImage
          name={product.heroImage}
          alt={getProductImageAlt(product)}
          sizes="300px"
          className="w-full h-full object-cover group-hover:scale-105 motion-reduce:group-hover:scale-100 transition-transform duration-500"
        />
        {hasAssistantData && (
          <button
            onClick={handleCompare}
            className={`absolute top-2 right-2 p-1.5 border transition-all ${
              selected
                ? "bg-accent border-accent text-accent-foreground"
                : "bg-background/80 border-border text-muted-foreground hover:border-accent"
            }`}
            title={selected ? "Ukloni iz poređenja" : "Dodaj u poređenje"}
          >
            {selected ? <Check size={14} /> : <Plus size={14} />}
          </button>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge variant="secondary" className="text-xs font-medium">
            {product.category}
          </Badge>
          <Badge variant="outline" className="text-xs border-accent/30 text-accent">
            {product.tag}
          </Badge>
        </div>
        <h3 className="font-heading font-bold text-lg text-foreground mb-2">
          {product.name}
        </h3>
        {keySpec && (
          <p className="text-sm text-muted-foreground font-body mb-4">
            {keySpec.label}:{" "}
            <TechTooltip value={keySpec.value} tooltipKey={keySpec.tooltipKey} />
          </p>
        )}
        <div className="mt-auto flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
          Detaljnije <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
