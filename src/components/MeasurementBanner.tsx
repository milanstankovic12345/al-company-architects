import { ArrowRight, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

const MeasurementBanner = () => (
  <section className="pb-24 md:pb-32 bg-background">
    <div className="container">
      <Reveal className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-border bg-muted/30 p-8 md:p-12">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0">
            <Ruler className="text-accent" size={22} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-black text-foreground mb-2">Besplatno merenje na vašoj adresi</h2>
            <p className="font-body text-muted-foreground max-w-xl">
              Dolazimo, uzimamo tačne mere i savetujemo vas — bez obaveze. Izaberite termin koji vam odgovara.
            </p>
          </div>
        </div>
        <Button variant="hero" size="lg" className="h-14 px-8 text-sm gap-2 shrink-0" asChild>
          <Link to="/merenje">
            Zakažite besplatno merenje <ArrowRight size={16} />
          </Link>
        </Button>
      </Reveal>
    </div>
  </section>
);

export default MeasurementBanner;
