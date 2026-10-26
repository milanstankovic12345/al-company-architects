import { Reveal } from "@/components/motion/Reveal";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsSlider from "./TestimonialsSlider";
import TrustBadges from "./TrustBadges";
import ProcessTimeline from "./ProcessTimeline";

const TrustSection = () => (
  <>
    <section className="bg-background py-24 md:py-32" aria-labelledby="trust-heading">
      <div className="container space-y-16">
        <Reveal className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Poverenje</p>
          <h2 id="trust-heading" className="font-heading text-3xl font-black leading-tight text-foreground md:text-5xl">
            Zašto nam klijenti veruju
          </h2>
        </Reveal>
        <TestimonialsSlider />
        <TrustBadges />
        <ProcessTimeline />
      </div>
    </section>
    <PartnersSection />
  </>
);

export default TrustSection;
