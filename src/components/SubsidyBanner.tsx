import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgePercent } from "lucide-react";
import { Link } from "react-router-dom";

const SubsidyBanner = () => {
  return (
    <section className="py-24 md:py-32 bg-background" id="subsidies">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden border border-accent/20 bg-accent/5 p-8 md:p-16"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative grid md:grid-cols-[1fr,auto] gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/20 flex items-center justify-center">
                  <BadgePercent className="text-accent" size={20} />
                </div>
                <p className="text-accent font-semibold text-sm tracking-[0.15em] uppercase">
                  Subvencije 2026
                </p>
              </div>

              <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground leading-tight mb-4">
                Ostvarite do 90% povraćaja
                <br />
                kroz državne subvencije
              </h2>

              <p className="font-body text-muted-foreground max-w-lg leading-relaxed">
                Nacionalni program za energetsku rehabilitaciju stambenih zgrada za 2026. godinu.
                Proverite da li vaša opština ispunjava uslove i uštedite na zameni stolarije.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button variant="hero" size="lg" className="h-14 px-10 text-sm gap-2" asChild>
                <Link to="/subvencije">
                  Proveri pravo na subvenciju <ArrowRight size={16} />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center font-body">
                Besplatna provera u 2 minuta
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SubsidyBanner;
