import { motion } from "framer-motion";

const PartnersSection = () => {
  return (
    <section className="py-20 bg-secondary/50 border-y border-border">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm font-body tracking-wide">
            Ekskluzivni partneri svetskih lidera u stolariji
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="font-heading font-black text-4xl md:text-5xl tracking-tight text-foreground/80">
              GEALAN
            </p>
            <p className="text-xs text-muted-foreground mt-2 tracking-[0.15em] uppercase font-body">
              Nemačka · PVC sistemi
            </p>
          </motion.div>

          <div className="w-px h-12 bg-border hidden md:block" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center"
          >
            <p className="font-heading font-black text-4xl md:text-5xl tracking-tight text-foreground/80">
              ALUMIL
            </p>
            <p className="text-xs text-muted-foreground mt-2 tracking-[0.15em] uppercase font-body">
              Grčka · ALU sistemi
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
