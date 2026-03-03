import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductSpecTable from "./ProductSpecTable";
import type { Product } from "@/data/products";
import { CheckCircle, Download } from "lucide-react";

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
        <TabsTrigger
          value="preuzimanja"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent px-6 py-3 font-heading font-semibold text-sm"
        >
          Preuzimanja
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

      <TabsContent value="preuzimanja" className="pt-8">
        <div className="space-y-3">
          {product.pdfLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="flex items-center gap-3 p-4 border border-border hover:border-accent/40 transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={18} className="text-accent" />
              <span className="font-body text-sm text-foreground group-hover:text-accent transition-colors">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
