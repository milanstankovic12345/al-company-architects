import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems, faqTopics } from "@/data/faq";
import { buildFaqJsonLd } from "@/lib/faq";

const FaqSection = () => (
  <section className="bg-secondary/30 py-24 md:py-32" aria-labelledby="faq-heading">
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(buildFaqJsonLd(faqItems))}</script>
    </Helmet>
    <div className="container">
      <Reveal className="mb-12 max-w-3xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Pitanja</p>
        <h2 id="faq-heading" className="font-heading text-3xl font-black leading-tight text-foreground md:text-5xl">
          Česta pitanja
        </h2>
      </Reveal>
      <div className="grid max-w-3xl gap-10">
        {faqTopics.map((topic) => (
          <div key={topic}>
            <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {topic}
            </h3>
            <Accordion type="single" collapsible>
              {faqItems
                .filter((i) => i.topic === topic)
                .map((i) => (
                  <AccordionItem key={i.id} value={i.id}>
                    <AccordionTrigger className="text-left font-heading text-base font-bold text-foreground">
                      {i.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm leading-relaxed text-muted-foreground">
                      <p>{i.answer}</p>
                      {i.link && (
                        <Link to={i.link.to} className="mt-3 inline-block font-semibold text-accent hover:underline">
                          {i.link.label} →
                        </Link>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
