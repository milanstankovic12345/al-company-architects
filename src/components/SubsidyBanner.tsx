import { SUBSIDY_SOURCE_URL } from "@/data/subsidy";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgePercent } from "lucide-react";
import { Link } from "react-router-dom";

const SubsidyBanner = () => {
  return (
    <section className="py-24 md:py-32 bg-background" id="subsidies">
      <div className="container">
        <Reveal className="relative overflow-hidden border border-accent/20 bg-accent/5 p-8 md:p-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative flex flex-col md:flex-row md:justify-between items-center text-center md:text-left gap-8 md:gap-12 w-full">
            <div className="flex flex-col items-center md:items-start w-full md:flex-1">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="w-10 h-10 bg-accent/20 flex items-center justify-center shrink-0">
                  <BadgePercent className="text-accent" size={20} />
                </div>
                <p className="text-accent font-semibold text-sm tracking-[0.15em] uppercase">
                  Subvencije 2026
                </p>
              </div>

              <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground leading-tight mb-4">
                Subvencije do 90% vrednosti
                <br />
                u zavisnosti od opštine i javnog poziva
              </h2>

              <p className="font-body text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed">
                Nacionalni program za energetsku rehabilitaciju stambenih zgrada za 2026. godinu.
                Proverite da li vaša opština ispunjava uslove i uštedite na zameni stolarije.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3 w-full sm:w-auto shrink-0">
              <Button variant="hero" size="lg" className="h-14 px-6 sm:px-10 text-sm gap-2 w-full sm:w-auto" asChild>
                <Link to="/subvencije" className="w-full justify-center">
                  Proveri pravo na subvenciju <ArrowRight size={16} />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center font-body w-full">
                Besplatna provera u 2 minuta ·{" "}
                <a href={SUBSIDY_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline">
                  Zvanični izvor
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SubsidyBanner;
