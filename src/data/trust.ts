import { Award, BadgeCheck, Factory, ShieldCheck, type LucideIcon } from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  /** Per-review stars were not visible in the public Maps view; omit rather than guess. */
  rating?: 1 | 2 | 3 | 4 | 5;
  source: "Google" | "Direktno";
  when: string;
}

export const googleSummary = {
  rating: "4,9",
  count: 16,
  url: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x4759ed14d24baac3:0xef671b98ed4ddb0d",
};

// Real Google reviews (read 2026-10-26). Text is Google's Serbian translation of the originals
// (bs/hr/en), converted to Latin script. TODO: replace with original wording from the owner.
export const testimonials: Testimonial[] = [
  {
    id: "g1",
    name: "Ilija B.",
    text: "Profesionalci, kvalitet, samo dođite i uverite se sami na licu mesta. Garancija 10 godina.",
    source: "Google",
    when: "pre godinu dana",
  },
  {
    id: "g2",
    name: "Mico P.",
    text: "Vrhunska stolarija po razumnim cenama. Ljudi su pravi majstori svog zanata. Preciznost u proizvodnji i ugradnji do najsitnijih detalja. Njihov rad možete prepoznati na mnogim mestima u Valjevu.",
    source: "Google",
    when: "pre 4 godine",
  },
  {
    id: "g3",
    name: "Ravi Prakash Architects",
    text: "Gaga ima sve što vam može zatrebati za prozore i vrata…",
    source: "Google",
    when: "pre 4 godine",
  },
];

export interface TrustBadge {
  title: string;
  description: string;
  icon: LucideIcon;
}

// TODO: real data from client (warranty length, exact certificate names)
export const badges: TrustBadge[] = [
  { title: "Garancija na proizvod", description: "Garancija na profile, okove i ugradnju — trajanje potvrditi sa vlasnikom.", icon: ShieldCheck },
  { title: "CE oznaka", description: "Sistemi sa CE oznakom i ispitanim performansama proizvođača.", icon: BadgeCheck },
  { title: "Ekskluzivni partner", description: "Ovlašćeni partner GEALAN (Nemačka) i ALUMIL (Grčka).", icon: Award },
  { title: "Domaća proizvodnja od 2002.", description: "Sopstvena proizvodnja i montaža u Valjevu.", icon: Factory },
];

export interface ProcessStep {
  title: string;
  description: string;
  to?: string;
}

export const processSteps: ProcessStep[] = [
  { title: "Upit", description: "Javite nam se pozivom, porukom ili putem forme.", to: "/kontakt" },
  { title: "Merenje", description: "Besplatno merenje na vašoj adresi.", to: "/merenje" },
  { title: "Ponuda", description: "Detaljna ponuda sa jasnim cenama.", to: "/ponuda" },
  { title: "Proizvodnja", description: "Izrada po meri u našoj radionici." },
  { title: "Montaža", description: "Stručna ugradnja i završna obrada." },
  { title: "Servis", description: "Podešavanje i održavanje i posle ugradnje." },
];
