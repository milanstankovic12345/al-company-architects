import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Palette } from "lucide-react";
import { drvodekorColors, finishCategories } from "@/data/finishes";

/** Drvodekor dedicated page — /proizvodi/drvodekor */
const Drvodekor = () => {
  const drvodekor = finishCategories.find((f) => f.id === "drvodekor")!;

  return (
    <main>
      <Helmet>
        <title>Drvodekor – dekor drveta za PVC | AL Company – PVC i aluminijumska stolarija Valjevo</title>
        <meta name="description" content="Preko 20 drvo dekor završnih obrada za PVC profile — idealno za rekonstrukciju starih objekata. Oregon, hrast, orah, mahagoni i drugi dekori." />
      </Helmet>
      <Navbar />
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <Palette className="text-accent" size={24} />
              <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase">Završne obrade</p>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-foreground mb-6">Drvodekor</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="border-l-4 border-accent pl-6 mb-10">
              <p className="font-body text-lg text-foreground leading-relaxed">{drvodekor.description}</p>
            </div>
          </motion.div>

          {/* Color swatch grid */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Paleta dekora</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-3">
              {drvodekorColors.map((color) => (
                <div key={color.name} className="group">
                  <div className="aspect-square rounded-sm border border-border hover:scale-110 transition-transform cursor-pointer shadow-sm" style={{ backgroundColor: color.colorHex }} title={color.name} />
                  <p className="text-[10px] text-muted-foreground text-center mt-1.5 leading-tight font-body">{color.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="border border-border bg-card p-8">
            <h2 className="text-xl font-heading font-bold text-foreground mb-6">Prednosti drvodekor obrade</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {drvodekor.features.map((feature) => (
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

export default Drvodekor;
