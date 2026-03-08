import { motion } from "framer-motion";
import { CheckCircle, Palette } from "lucide-react";
import { drvodekorColors, finishCategories } from "@/data/finishes";

const FinishesSection = () => {
  const drvodekor = finishCategories.find((f) => f.id === "drvodekor")!;
  const acrylcolor = finishCategories.find((f) => f.id === "acrylcolor")!;

  return (
    <section className="mt-20 pt-16 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Palette className="text-accent" size={24} />
          <p className="text-accent font-semibold text-sm tracking-[0.15em] uppercase">
            Završne obrade
          </p>
        </div>
        <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground mb-12">
          Boje i dekori
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Drvodekor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border border-border bg-card p-8"
        >
          <h3 className="text-xl font-heading font-bold text-foreground mb-3">
            {drvodekor.title}
          </h3>
          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
            {drvodekor.description}
          </p>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-6">
            {drvodekorColors.map((color) => (
              <div key={color.name} className="group relative">
                <div
                  className="w-full aspect-square rounded-sm border border-border cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.colorHex }}
                  title={color.name}
                />
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-2">
            {drvodekor.features.slice(0, 4).map((feature) => (
              <div key={feature} className="flex items-start gap-2">
                <CheckCircle className="text-accent mt-0.5 shrink-0" size={14} />
                <span className="text-xs font-body text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Acrylcolor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border border-border bg-card p-8"
        >
          <h3 className="text-xl font-heading font-bold text-foreground mb-3">
            {acrylcolor.title}
          </h3>
          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
            {acrylcolor.description}
          </p>

          <div className="flex gap-3 mb-6">
            {["#FFFFFF", "#383838", "#8B4513", "#722F37", "#DAA520", "#A8A9AD"].map((hex) => (
              <div
                key={hex}
                className="w-10 h-10 rounded-sm border border-border"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-2">
            {acrylcolor.features.slice(0, 4).map((feature) => (
              <div key={feature} className="flex items-start gap-2">
                <CheckCircle className="text-accent mt-0.5 shrink-0" size={14} />
                <span className="text-xs font-body text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinishesSection;
