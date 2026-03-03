export type ProductCategory = "PVC" | "ALU";

export interface ProductSpec {
  label: string;
  value: string;
  tooltipKey?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  tag: string;
  heroImage: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  pdfLinks: { label: string; url: string }[];
}

export const techExplanations: Record<string, string> = {
  uf: "Uf (koeficijent prolaza toplote okvira) – niža vrednost znači bolju izolaciju. Ispod 1.0 je standard pasivne kuće.",
  uw: "Uw (koeficijent prolaza toplote prozora) – kombinuje okvir i staklo. Vrednost 0.9 pruža najviši nivo zaštite od gubitka toplote.",
  ud: "Ud (koeficijent prolaza toplote vrata) – niža vrednost znači toplija vrata i manje gubitke energije.",
  db: "dB (decibeli) – mera zvučne izolacije. Vrednosti iznad 40 dB značajno smanjuju spoljašnju buku.",
  rc: "RC (klasa otpornosti na provalu) – RC3 pruža visok nivo zaštite od provale, testiran prema evropskim standardima.",
  watertightness: "Klasa vodonepropusnosti – E1200 znači otpornost na kišu pri vetru do 1200 Pa, što je izuzetno visok standard.",
  chambers: "Više komora u profilu znači bolja toplotna izolacija jer svaka komora stvara vazdušni džep koji sprečava provođenje toplote.",
  sealing: "Više nivoa zaptivanja znači bolju zaštitu od prodora vode, vazduha i buke.",
};

export const products: Product[] = [
  {
    slug: "gealan-s9000",
    name: "GEALAN S-9000",
    category: "PVC",
    tag: "Pasivna kuća",
    heroImage: "/placeholder.svg",
    description:
      "GEALAN S-9000 je vrhunski PVC profilni sistem dizajniran za pasivne kuće i objekte sa najvišim zahtevima za energetsku efikasnost. Sa šest komora i dubinom od 82.5mm, pruža izuzetnu toplotnu izolaciju koja zadovoljava najstrože standarde. STV® tehnologija omogućava izradu velikih elemenata bez čeličnog ojačanja.",
    features: [
      "Standard pasivne kuće – Uf od 0.92 W/m²K",
      "STV® tehnologija za velike elemente bez čelika",
      "6-komorna konstrukcija za maksimalnu izolaciju",
      "3 nivoa zaptivanja protiv vode, vazduha i buke",
      "Reciklabilan materijal – ekološki prihvatljiv",
      "Širok izbor dekora i boja",
    ],
    specs: [
      { label: "Uf vrednost", value: "0.92 W/m²K", tooltipKey: "uf" },
      { label: "Dubina profila", value: "82.5 mm" },
      { label: "Broj komora", value: "6", tooltipKey: "chambers" },
      { label: "Nivoi zaptivanja", value: "3", tooltipKey: "sealing" },
      { label: "Zvučna izolacija", value: "Do 47 dB", tooltipKey: "db" },
      { label: "Maksimalna veličina", value: "STV® za velike elemente" },
    ],
    pdfLinks: [
      { label: "GEALAN S-9000 Katalog", url: "#" },
      { label: "Tehnički list", url: "#" },
    ],
  },
  {
    slug: "gealan-linear",
    name: "GEALAN-LINEAR®",
    category: "PVC",
    tag: "Moderan dizajn",
    heroImage: "/placeholder.svg",
    description:
      "GEALAN-LINEAR® je profilni sistem sa minimalističkim, ugaonim linijama koji spaja savremenu estetiku sa visokim performansama. Idealan za moderne arhitektonske projekte gde je važan čist i elegantan izgled. Dubina od 74mm i izuzetna zvučna izolacija čine ga odličnim izborom za urbana okruženja.",
    features: [
      "Minimalistički ugaoni dizajn",
      "Odlična zvučna izolacija do 47 dB",
      "Kompaktan profil dubine 74 mm",
      "Energetski efikasan – Uf 1.0 W/m²K",
      "Idealan za savremenu arhitekturu",
      "Dostupan u raznim bojama i dekorima",
    ],
    specs: [
      { label: "Uf vrednost", value: "1.0 W/m²K", tooltipKey: "uf" },
      { label: "Dubina profila", value: "74 mm" },
      { label: "Broj komora", value: "6", tooltipKey: "chambers" },
      { label: "Nivoi zaptivanja", value: "3", tooltipKey: "sealing" },
      { label: "Zvučna izolacija", value: "Do 47 dB", tooltipKey: "db" },
      { label: "Dizajn", value: "Minimalistički ugaoni" },
    ],
    pdfLinks: [
      { label: "GEALAN-LINEAR® Katalog", url: "#" },
      { label: "Tehnički list", url: "#" },
    ],
  },
  {
    slug: "alumil-supreme-sd77",
    name: "ALUMIL SUPREME SD77",
    category: "ALU",
    tag: "Ulazna vrata",
    heroImage: "/placeholder.svg",
    description:
      "ALUMIL SUPREME SD77 je premium aluminijumski sistem za ulazna vrata koji kombinuje izuzetnu sigurnost sa vrhunskom toplotnom izolacijom. Sa RC3 sertifikovanom otpornošću na provalu i Ud vrednošću od 0.7 W/m²K, pruža mir i udobnost. Nizak prag od 22mm omogućava lak pristup.",
    features: [
      "RC3 sertifikovana zaštita od provale",
      "Vrhunska izolacija – Ud od 0.7 W/m²K",
      "Nizak prag (22mm) za lak pristup",
      "Dubina profila 77mm za stabilnost",
      "Premium aluminijumska izrada",
      "Širok izbor boja i obloga",
    ],
    specs: [
      { label: "Ud vrednost", value: "Od 0.7 W/m²K", tooltipKey: "ud" },
      { label: "Dubina profila", value: "77 mm" },
      { label: "Klasa sigurnosti", value: "RC3", tooltipKey: "rc" },
      { label: "Visina praga", value: "22 mm (nizak prag)" },
      { label: "Materijal", value: "Aluminijum" },
      { label: "Namena", value: "Ulazna vrata" },
    ],
    pdfLinks: [
      { label: "SUPREME SD77 Katalog", url: "#" },
      { label: "Tehnički list", url: "#" },
    ],
  },
  {
    slug: "alumil-smartia-s67",
    name: "ALUMIL SMARTIA S67",
    category: "ALU",
    tag: "Nagib-otklon",
    heroImage: "/placeholder.svg",
    description:
      "ALUMIL SMARTIA S67 je elegantan aluminijumski sistem za prozore sa nagib-otklon funkcijom. Minimalistički dizajn sa vidljivom visinom aluminijuma od samo 93mm omogućava maksimalan prodor svetlosti. Izuzetna vodonepropusnost klase E1200 garantuje pouzdanost u svim vremenskim uslovima.",
    features: [
      "Minimalistički dizajn – 93mm vidljiva visina",
      "Vodonepropusnost klase E1200",
      "Nagib-otklon funkcionalnost",
      "Uf od 1.1 do 2.6 W/m²K",
      "Maksimalan prodor svetlosti",
      "Elegantna aluminijumska estetika",
    ],
    specs: [
      { label: "Uf vrednost", value: "1.1 – 2.6 W/m²K", tooltipKey: "uf" },
      { label: "Vidljiva visina", value: "93 mm" },
      { label: "Vodonepropusnost", value: "Klasa E1200", tooltipKey: "watertightness" },
      { label: "Tip otvaranja", value: "Nagib-otklon (Tilt & Turn)" },
      { label: "Materijal", value: "Aluminijum" },
      { label: "Estetika", value: "Minimalistički profil" },
    ],
    pdfLinks: [
      { label: "SMARTIA S67 Katalog", url: "#" },
      { label: "Tehnički list", url: "#" },
    ],
  },
];
