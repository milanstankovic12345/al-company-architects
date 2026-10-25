import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/Products/ProductCard";
import ComparisonDrawer from "@/components/Assistant/ComparisonDrawer";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Dedicated PVC Systems page listing all GEALAN profile products.
 * Route: /proizvodi/pvc
 */
const PvcProducts = () => {
  const pvcProducts = products.filter((p) => p.category === "PVC");

  return (
    <main>
      <Helmet>
        <title>PVC stolarija – GEALAN profili | AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta
          name="description"
          content="PVC prozori i vrata na bazi GEALAN profila – S-9000 za pasivne kuće, S-7000 IQ, S-8000 IQ, S-3000, LINEAR. AL Company Valjevo."
        />
      </Helmet>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">
              GEALAN profili
            </p>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">
              PVC stolarija
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mb-12">
              Kompletna ponuda PVC prozora i vrata na bazi GEALAN profilnih sistema — od ekonomičnog S-3000
              do premium S-9000 za pasivne kuće. Svi profili su ekološki, reciklabilni i dostupni u
              raznovrsnim dekorima i bojama.
            </p>
          </motion.div>

          {/* TEMPORARY stock photo (Pexels licence): Jan van der Wolf, https://www.pexels.com/photo/minimalist-window-on-concrete-wall-in-sunlight-30583624/ */}
          <PageBanner name="stock-pvc-window" alt="Bela PVC prozor sa dva krila na zidu kuće u sunčanom svetlu" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pvcProducts.map((product, i) => (
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 border border-border bg-card p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Zainteresovani za PVC stolariju?
                </h2>
                <p className="font-body text-muted-foreground">
                  Kontaktirajte nas za besplatnu ponudu prilagođenu vašem projektu.
                </p>
              </div>
              <Link to="/ponuda">
                <Button variant="hero" size="lg" className="gap-2 whitespace-nowrap">
                  Zatražite ponudu <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <ComparisonDrawer />
      <Footer />
    </main>
  );
};

export default PvcProducts;
