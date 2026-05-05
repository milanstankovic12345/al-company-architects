import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/Products/ProductCard";
import ComparisonWidget from "@/components/Products/ComparisonWidget";
import ComparisonDrawer from "@/components/Assistant/ComparisonDrawer";
import FinishesSection from "@/components/Products/FinishesSection";
import {
  products,
  subcategoryOrder,
  subcategoryLabels,
  type ProductCategory,
  type ProductSubcategory,
} from "@/data/products";

const filters: { label: string; value: "all" | ProductCategory }[] = [
  { label: "Svi", value: "all" },
  { label: "PVC Sistemi", value: "PVC" },
  { label: "ALU Sistemi", value: "ALU" },
];

const Products = () => {
  const [active, setActive] = useState<"all" | ProductCategory>("all");
  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  // Group by subcategory
  const groupedBySubcategory = subcategoryOrder
    .map((sub) => ({
      subcategory: sub,
      label: subcategoryLabels[sub],
      items: filtered.filter((p) => p.subcategory === sub),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <main>
      <Helmet>
        <title>Proizvodi | AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta name="description" content="Kompletan asortiman PVC i aluminijumskih prozora, vrata, kliznih sistema i fasada. GEALAN i ALUMIL profili." />
      </Helmet>
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
              Istražite kompletnu ponudu PVC i aluminijumskih sistema — od prozora za pasivne kuće do premium ulaznih vrata, kliznih sistema i staklenih fasada.
            </p>
          </motion.div>

          <div className="flex gap-2 mb-12">
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

          {groupedBySubcategory.map((group, gi) => (
            <div key={group.subcategory} className={gi > 0 ? "mt-16" : ""}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  {group.label}
                </h2>
                <div className="w-12 h-0.5 bg-accent mt-2" />
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {group.items.map((product, i) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-16">
            <ComparisonWidget />
          </div>

          <FinishesSection />
        </div>
      </section>
      <ComparisonDrawer />
      <Footer />
    </main>
  );
};

export default Products;
