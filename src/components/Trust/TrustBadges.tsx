import { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { badges } from "@/data/trust";

const TrustBadges = () => (
  <RevealStagger className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
    {badges.map((b) => (
      <RevealItem key={b.title} className="bg-background p-6">
        <div className="mb-4 flex h-10 w-10 items-center justify-center bg-accent/10 text-accent">
          <b.icon size={20} strokeWidth={1.5} />
        </div>
        <h3 className="mb-2 font-heading text-base font-bold text-foreground">{b.title}</h3>
        <p className="font-body text-sm leading-relaxed text-muted-foreground">{b.description}</p>
      </RevealItem>
    ))}
  </RevealStagger>
);

export default TrustBadges;
