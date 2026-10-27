export interface FaqItem {
  id: string;
  topic: string;
  question: string;
  /** Plain text: shown in the accordion and reused as the JSON-LD answer. */
  answer: string;
  link?: { to: string; label: string };
}

// TODO: confirm all answers with the owner (prices, lead times, warranty length, winter installation).
export const faqItems: FaqItem[] = [
  {
    id: "cene-1",
    topic: "Cene",
    question: "Koliko košta zamena prozora?",
    answer:
      "Cena zavisi od sistema profila (PVC ili aluminijum), dimenzija, broja krila, stakla i okova. Zato ne objavljujemo okvirne cene, već pravimo ponudu prema vašim merama, besplatno i bez obaveze.",
    link: { to: "/ponuda", label: "Zatražite ponudu" },
  },
  {
    id: "cene-2",
    topic: "Cene",
    question: "Da li je merenje i izrada ponude besplatna?",
    answer:
      "Da. Merenje na licu mesta i ponuda su besplatni i ne obavezuju vas na kupovinu.",
    link: { to: "/merenje", label: "Zakažite merenje" },
  },
  {
    id: "rokovi-1",
    topic: "Rokovi isporuke",
    question: "Koliko traje izrada i isporuka?",
    answer:
      "Rok izrade zavisi od obima posla i trenutnog opterećenja proizvodnje. Tačan rok dobijate uz ponudu, nakon merenja.",
  },
  {
    id: "rokovi-2",
    topic: "Rokovi isporuke",
    question: "Da li stolariju proizvodite sami?",
    answer:
      "Da, stolariju proizvodimo i montiramo sopstvenim kapacitetima u Valjevu, od 2002. godine, na GEALAN i ALUMIL profilima.",
  },
  {
    id: "garancija-1",
    topic: "Garancija",
    question: "Kakvu garanciju dajete?",
    answer:
      "Garancija obuhvata profile, okove i ugradnju. Tačno trajanje i uslove dobijate u pisanom obliku uz ponudu.",
  },
  {
    id: "odrzavanje-1",
    topic: "Održavanje",
    question: "Kako se održavaju PVC i aluminijumski prozori?",
    answer:
      "Ramove perite mlakom vodom i blagim sredstvom, bez abrazivnih sredstava i rastvarača. Gumene zaptivke povremeno obrišite, a pokretne delove okova jednom do dvaput godišnje podmažite uljem za okove.",
  },
  {
    id: "odrzavanje-2",
    topic: "Održavanje",
    question: "Šta ako prozor teško ide ili ne zatvara dobro?",
    answer:
      "Najčešće je potrebno podešavanje okova. Javite nam se i dogovorićemo servis.",
    link: { to: "/kontakt", label: "Kontakt" },
  },
  {
    id: "subvencije-1",
    topic: "Subvencije",
    question: "Mogu li da dobijem subvenciju za zamenu stolarije?",
    answer:
      "Mogućnost zavisi od aktuelnih javnih poziva i od vaše lokalne samouprave. Naš navigator za subvencije vodi vas kroz uslove i potrebnu dokumentaciju korak po korak.",
    link: { to: "/subvencije", label: "Navigator za subvencije" },
  },
  {
    id: "montaza-1",
    topic: "Montaža zimi",
    question: "Može li se stolarija montirati zimi?",
    answer:
      "Može. Montaža se radi i u hladnijim mesecima, ali zahteva dobru organizaciju: radi se prostor po prostor da kuća ostane zatvorena što kraće. Detalje dogovaramo pri merenju.",
  },
];

export const faqTopics = Array.from(new Set(faqItems.map((i) => i.topic)));
