import { Award, BadgeCheck, Factory, ShieldCheck, type LucideIcon } from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  town: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: "Google" | "Direktno";
}

// TODO: real data from client (replace with actual Google reviews / customer quotes)
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ime Prezime",
    town: "Valjevo",
    text: "Primer recenzije: stolarija je ugrađena u dogovorenom roku, a montaža je bila uredna i profesionalna.",
    rating: 5,
    source: "Google",
  },
  {
    id: "t2",
    name: "Ime Prezime",
    town: "Beograd",
    text: "Primer recenzije: merenje na licu mesta i jasna ponuda bez iznenađenja. Razlika u toplini se oseti već prve zime.",
    rating: 5,
    source: "Google",
  },
  {
    id: "t3",
    name: "Ime Prezime",
    town: "Šabac",
    text: "Primer recenzije: ljubazno osoblje i brza reakcija kada je trebalo podesiti okove nakon montaže.",
    rating: 5,
    source: "Direktno",
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
