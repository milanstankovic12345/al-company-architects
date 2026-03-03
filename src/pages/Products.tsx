import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/Products/ProductCard";
import ComparisonWidget from "@/components/Products/ComparisonWidget";
import { products, type ProductCategory } from "@/data/products";

const filters: { label: string; value: "all" | ProductCategory }[] = [
  { label: "Svi", value: "all" },
  { label: "PVC Sistemi", value: "PVC" },
  { label: "ALU Sistemi", value: "ALU" },
];

const Products = () => {
  const [active, setActive] = useState<"all" | ProductCategory>("all");
  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <main>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
              Naši proizvodi
            </h1>
            <p className="font-body text-muted-foreground max-w-xl mb-10">
              Istražite kompletnu ponudu PVC i aluminijumskih sistema — od prozora za pasivne kuće do premium ulaznih vrata.
            </p>
          </motion.div>

          <div className="flex gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`px-5 py-2 text-sm font-medium transition-colors border ${
                  active === f.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-foreground/30"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filtered.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <ComparisonWidget />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Products;
