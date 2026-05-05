import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/Products/ProductCard";
import ComparisonDrawer from "@/components/Assistant/ComparisonDrawer";
import { products } from "@/data/products";
import { X, ImageOff } from "lucide-react";

/**
 * Entrance Doors page with compare-enabled product cards for door groups
 * and a detailed model catalog (M 1 – M 138) below.
 * Route: /proizvodi/ulazna-vrata
 */

function generateDoorGroups(): { groupLabel: string; models: string[] }[] {
  const groups: { groupLabel: string; models: string[] }[] = [];
  for (let i = 1; i <= 138; i += 4) {
    const end = Math.min(i + 3, 138);
    const models: string[] = [];
    for (let j = i; j <= end; j++) {
      models.push(`M ${j}`);
    }
    groups.push({ groupLabel: `M ${i}–M ${end}`, models });
  }
  return groups;
}

const doorGroups = generateDoorGroups();

const EntranceDoors = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const doorProducts = products.filter(
    (p) => p.subcategory === "Ulazna vrata katalog"
  );

  return (
    <main>
      <Helmet>
        <title>Ulazna vrata – 130+ modela | AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta name="description" content="Katalog ulaznih vrata sa preko 130 modela (M 1 – M 138). Uporedite klasične, moderne i premium modele. AL Company Valjevo." />
      </Helmet>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">Katalog</p>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-4">Ulazna vrata</h1>
            <p className="font-body text-muted-foreground max-w-2xl mb-4">
              Preko 130 modela ulaznih vrata u našoj ponudi — od klasičnih do savremenih dizajna.
              Izaberite kategoriju i uporedite karakteristike.
            </p>
            <p className="font-body text-sm text-muted-foreground/70 mb-12">
              Kliknite na ✚ ikonu da dodate model u poređenje (do 3 proizvoda).
            </p>
          </motion.div>

          {/* Compare-enabled product cards for door groups */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Kategorije ulaznih vrata
            </h2>
            <div className="w-12 h-0.5 bg-accent mt-2" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {doorProducts.map((product, i) => (
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

          {/* Full model catalog */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Svi modeli (M 1 – M 138)
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-2">
              Slike modela se dodaju. Kontaktirajte nas za katalog sa fotografijama.
            </p>
            <div className="w-12 h-0.5 bg-accent mt-2" />
          </motion.div>

          <div className="space-y-12">
            {doorGroups.map((group, gi) => (
              <motion.div key={group.groupLabel} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: gi * 0.02 }}>
                <h3 className="text-lg font-heading font-bold text-foreground mb-4">{group.groupLabel}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {group.models.map((model) => (
                    <button key={model} onClick={() => setSelectedModel(model)} className="group border border-border bg-card hover:border-accent/50 transition-all duration-200 p-4 flex flex-col items-center justify-center aspect-[3/4] cursor-pointer">
                      <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mb-3 group-hover:bg-accent/10 transition-colors">
                        <ImageOff className="text-muted-foreground/40 group-hover:text-accent/60 transition-colors" size={20} />
                      </div>
                      <p className="font-heading font-bold text-foreground text-sm">{model}</p>
                      <p className="text-xs text-muted-foreground/50 mt-1">Slika uskoro</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedModel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedModel(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card border border-border p-8 max-w-md w-full text-center relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedModel(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" aria-label="Zatvori">
                <X size={20} />
              </button>
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageOff className="text-muted-foreground/40" size={28} />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">{selectedModel}</h3>
              <p className="text-sm font-body text-muted-foreground mb-4">Fotografija za ovaj model biće uskoro dostupna.</p>
              <p className="text-xs text-muted-foreground/60">
                Za detalje kontaktirajte nas na{" "}
                <a href="tel:+38114246079" className="text-accent hover:underline">+381 14 246 079</a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ComparisonDrawer />
      <Footer />
    </main>
  );
};

export default EntranceDoors;
