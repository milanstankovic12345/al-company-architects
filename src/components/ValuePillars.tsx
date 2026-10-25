import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { Shield, Thermometer, Volume2, Award } from "lucide-react";

const pillars = [
  {
    icon: Thermometer,
    title: "Termička superiornost",
    description: "GEALAN S-9000 sistem sa tri nivoa zaptivanja i Uf vrednošću do 0.89 W/m²K. Ušteda energije do 40%.",
    accent: "accent",
  },
  {
    icon: Volume2,
    title: "Utočište tišine",
    description: "Redukcija buke do 47dB. Vaš dom postaje oaza mira, čak i u najbuknijim gradskim sredinama.",
    accent: "tech-blue",
  },
  {
    icon: Shield,
    title: "Sigurnost bez kompromisa",
    description: "RC2 klasa otpornosti na provalu. Višekomorni profili sa čeličnim ojačanjima za maksimalnu zaštitu.",
    accent: "accent",
  },
  {
    icon: Award,
    title: "Nemačko-Grčki inženjering",
    description: "Ekskluzivni partner GEALAN (Nemačka) i ALUMIL (Grčka) — dva lidera evropske stolarije.",
    accent: "tech-blue",
  },
];

const ValuePillars = () => {
  return (
    <section className="py-24 md:py-32 bg-background" id="about">
      <div className="container">
        <Reveal className="max-w-3xl mb-16">
          <p className="text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            Zašto AL Company
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-foreground leading-tight mb-6">
            Generacijska investicija u
            <br />
            komfor i sigurnost
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed text-base md:text-lg">
            Preduzeće AL Company je nastalo kao rezultat ulaganja kapitala i znanja tokom dugog niza godina i jedno je od pionira u proizvodnji PVC i ALU stolarije u Srbiji. Nudimo širok asortiman proizvoda od svetski poznatih proizvođača — <strong className="text-foreground">GEALAN</strong> (Nemačka) i <strong className="text-foreground">ALUMIL</strong> (Grčka) — čiji kvalitet stoji na samom vrhu domaće i evropske proizvodnje. Naš tim stručnjaka kontinuirano prati svetske inovacije kako bi svakom klijentu ponudili najbolje rešenje.
          </p>
        </Reveal>

        <RevealStagger className="grid md:grid-cols-2 gap-px bg-border" stagger={0.1}>
          {pillars.map((pillar) => (
            <RevealItem
              key={pillar.title}
              className="bg-background p-8 md:p-12 group hover:bg-secondary/50 transition-colors"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center mb-6 ${
                  pillar.accent === "accent" ? "bg-accent/10 text-accent" : "bg-tech-blue/10 text-tech-blue"
                }`}
              >
                <pillar.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
};

export default ValuePillars;
