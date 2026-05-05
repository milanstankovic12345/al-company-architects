import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Palette } from "lucide-react";
import { finishCategories } from "@/data/finishes";

/** Common RAL colors for window profiles */
const ralSwatches = [
  { name: "Bela (RAL 9016)", hex: "#F7F7F2" },
  { name: "Antracit siva (RAL 7016)", hex: "#383E42" },
  { name: "Braon (RAL 8014)", hex: "#4A3526" },
  { name: "Bež (RAL 1015)", hex: "#E6D2B5" },
  { name: "Tamno zelena (RAL 6009)", hex: "#27352A" },
  { name: "Srebrno siva (RAL 9006)", hex: "#A5A5A5" },
  { name: "Crna (RAL 9005)", hex: "#0E0E10" },
  { name: "Krem bela (RAL 9001)", hex: "#F2EAD7" },
];

/** Acrylcolor dedicated page — /proizvodi/acrylcolor */
const Acrylcolor = () => {
  const acrylcolor = finishCategories.find((f) => f.id === "acrylcolor")!;

  return (
    <main>
      <Helmet>
        <title>Acrylcolor – boje za PVC profile | AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta name="description" content="Acrylcolor koekstrudirani akrilni sloj za PVC profile — trajna boja integrisana u materijal, UV otporna. RAL paleta boja." />
      </Helmet>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <Palette className="text-accent" size={24} />
              <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase">Završne obrade</p>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-6">Acrylcolor</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="border-l-4 border-accent pl-6 mb-10">
              <p className="font-body text-lg text-foreground leading-relaxed">{acrylcolor.description}</p>
            </div>
          </motion.div>

          {/* RAL color swatches */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">RAL paleta boja</h2>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Najpopularnije RAL boje za PVC profile. Dostupne su i dodatne boje iz kompletne RAL palete na zahtev.
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {ralSwatches.map((swatch) => (
                <div key={swatch.name} className="group">
                  <div className="aspect-square rounded-sm border border-border hover:scale-110 transition-transform cursor-pointer shadow-sm" style={{ backgroundColor: swatch.hex }} title={swatch.name} />
                  <p className="text-[10px] text-muted-foreground text-center mt-1.5 leading-tight font-body">{swatch.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="border border-border bg-card p-8">
            <h2 className="text-xl font-heading font-bold text-foreground mb-6">Prednosti Acrylcolor obrade</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {acrylcolor.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle className="text-accent mt-0.5 shrink-0" size={16} />
                  <span className="text-sm font-body text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Acrylcolor;
