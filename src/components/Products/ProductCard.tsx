import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";
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
      className="group border border-border bg-card hover:border-accent/40 transition-all duration-300 flex flex-col"
    >
      <div className="aspect-[4/3] bg-muted overflow-hidden">
        <img
          src={product.heroImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
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
