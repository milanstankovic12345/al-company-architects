import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/Products/ProductCard";
import ComparisonDrawer from "@/components/Assistant/ComparisonDrawer";
import { products, type ProductSubcategory } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Dedicated Aluminum Systems page listing all ALUMIL profile products.
 * Route: /proizvodi/aluminijum
 * Organized into three sub-sections: Standard, Sliding, Thermal Break
 */

interface AluSection {
  title: string;
  description: string;
  subcategories: ProductSubcategory[];
}

const aluSections: AluSection[] = [
  {
    title: "Standardni sistemi",
    description:
      "Aluminijumski profilni sistemi za prozore i vrata — od ekonomičnih rešenja bez termičkog prekida do premium modela sa visokom toplotnom izolacijom.",
    subcategories: ["Prozori", "Vrata"],
  },
  {
    title: "Klizni sistemi",
    description:
      "Klizni i podizno-klizni sistemi za velike staklene otvore — terase, verande i luksuzne rezidencije sa panoramskim pogledom.",
    subcategories: ["Klizni sistemi"],
  },
  {
    title: "Fasadni sistemi i roletne",
    description:
      "Strukturalni curtain wall sistemi za poslovne objekte i aluminijumske roletne za dodatnu zaštitu i izolaciju.",
    subcategories: ["Fasade", "Roletne"],
  },
];

const AluProducts = () => {
  const aluProducts = products.filter((p) => p.category === "ALU");

  return (
    <main>
      <Helmet>
        <title>Aluminijumska stolarija – ALUMIL profili | AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta
          name="description"
          content="Aluminijumski prozori, vrata, klizni sistemi i fasade na bazi ALUMIL profila. Termički prekid, SMARTIA, SUPREME serije. AL Company Valjevo."
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
              ALUMIL profili
            </p>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">
              Aluminijumska stolarija
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mb-12">
              Kompletna ponuda aluminijumskih sistema na bazi ALUMIL profila — prozori, ulazna vrata,
              klizni sistemi, staklene fasade i roletne. Elegancija aluminijuma, dugotrajnost
              i minimalno održavanje.
            </p>
          </motion.div>

          {/* TEMPORARY stock photo (Pexels licence): Max Vakhtbovych, https://www.pexels.com/photo/a-cozy-living-room-with-a-pool-view-8134753/ */}
          <PageBanner name="stock-alu-lift-slide" alt="Velika klizna aluminijumska vrata sa crnim profilima koja se otvaraju ka bazenu" />

          {aluSections.map((section, si) => {
            const sectionProducts = aluProducts.filter((p) =>
              section.subcategories.includes(p.subcategory)
            );
            if (sectionProducts.length === 0) return null;

            return (
              <div key={section.title} className={si > 0 ? "mt-16" : ""}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="mb-6"
                >
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    {section.title}
                  </h2>
                  <p className="font-body text-muted-foreground text-sm mt-2 max-w-xl">
                    {section.description}
                  </p>
                  <div className="w-12 h-0.5 bg-accent mt-3" />
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sectionProducts.map((product, i) => (
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
            );
          })}

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
                  Zainteresovani za aluminijumsku stolariju?
                </h2>
                <p className="font-body text-muted-foreground">
                  Kontaktirajte nas za besplatnu ponudu prilagođenu vašem projektu.
                </p>
              </div>
              <Link to="/kontakt">
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

export default AluProducts;
