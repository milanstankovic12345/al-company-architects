import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductSpecTable from "./ProductSpecTable";
import type { Product } from "@/data/products";
import { CheckCircle } from "lucide-react";

interface ProductTabsProps {
  product: Product;
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  return (
    <Tabs defaultValue="opis" className="w-full">
      <TabsList className="w-full justify-start bg-muted/50 rounded-none border-b border-border p-0 h-auto">
        <TabsTrigger
          value="opis"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-6 py-3 font-heading font-semibold text-sm"
        >
          Opis
        </TabsTrigger>
        <TabsTrigger
          value="specifikacije"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-6 py-3 font-heading font-semibold text-sm"
        >
          Tehničke Specifikacije
        </TabsTrigger>
      </TabsList>

      <TabsContent value="opis" className="pt-8">
        <p className="font-body text-muted-foreground leading-relaxed mb-8 max-w-2xl">
          {product.description}
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <CheckCircle className="text-accent mt-0.5 shrink-0" size={18} />
              <span className="text-sm font-body text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="specifikacije" className="pt-8">
        <ProductSpecTable specs={product.specs} />
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
