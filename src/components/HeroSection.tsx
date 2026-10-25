import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-architecture.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-hero flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Moderna arhitektura sa aluminium prozorima"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
      </div>

      <div className="relative container flex-1 pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-6">
              Od 2002. godine
            </p>
            <h1 className="text-[clamp(2.25rem,1.2rem+4.5vw,4.5rem)] font-heading font-black text-primary-foreground leading-[0.95] mb-6">
              Arhitektonska
              <br />
              Preciznost.
              <br />
              <span className="text-gradient-accent">Energetska</span>
              <br />
              Superiornost.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-lg md:text-xl text-primary-foreground/70 max-w-lg mb-10"
          >
            Vrhunska PVC i ALU stolarija sa tradicijom od 2002. godine.
            Partneri kompanija GEALAN i ALUMIL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/kontakt">
              <Button variant="hero" size="lg" className="h-14 px-10 text-sm">
                Zatražite ponudu
              </Button>
            </Link>
            <Link to="/subvencije">
              <Button variant="hero-outline" size="lg" className="h-14 px-10 text-sm">
                Vodič za subvencije 2026
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats bar (in document flow, after the CTAs) */}
      <div className="relative bg-primary/60 backdrop-blur-md border-t border-primary-foreground/10">
        <div className="container grid grid-cols-2 md:grid-cols-4">
          {[
            { value: "30+", label: "Godina iskustva" },
            { value: "15,000+", label: "Realizovanih projekata" },
            { value: "0.72", label: "Uf vrednost (W/m²K)" },
            { value: "47dB", label: "Zvučna izolacija" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`py-5 px-4 text-center border-primary-foreground/10 ${
                i % 2 === 1 ? "border-l" : ""
              } ${i >= 2 ? "border-t" : ""} md:border-t-0 ${
                i > 0 ? "md:border-l" : ""
              }`}
            >
              <p className="text-2xl md:text-3xl font-heading font-black text-primary-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-primary-foreground/60 mt-1 font-body">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
