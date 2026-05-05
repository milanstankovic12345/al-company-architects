import alumilM11000Image from "@/assets/products/alumil m 11000.jpg";
import alumilM11500Image from "@/assets/products/alumil m 11500.jpg";
import alumilM11600Image from "@/assets/products/alumil m 11600.jpg";
import alumilM23300Image from "@/assets/products/alumil m 23300.jpg";
import alumilM300Image from "@/assets/products/alumil m 300.jpg";
import alumilM5600Image from "@/assets/products/alumil m 5600.jpg";
import alumilM9050Image from "@/assets/products/alumil m 9050.jpg";
import alumilM9400Image from "@/assets/products/alumil m 9400.jpg";
import alumilM9650Image from "@/assets/products/alumil m 9650.jpg";
import alumilSmartiaS67Image from "@/assets/products/alumil smartia s67.jpg";
import alumilSupremeSd77Image from "@/assets/products/alumil supreme sd77.jpg";
import gealanLinearImage from "@/assets/products/gealan-linear.jpg";
import gealanS3000Image from "@/assets/products/gealan-s3000.jpg";
import gealanS7000IqImage from "@/assets/products/gealan-s7000 iq.jpg";
import gealanS8000IqImage from "@/assets/products/gealan-s8000 iq.jpg";
import gealanS9000Image from "@/assets/products/gealan-s9000.jpg";

export type ProductCategory = "PVC" | "ALU";
export type ProductSubcategory = "Prozori" | "Vrata" | "Klizni sistemi" | "Fasade" | "Roletne" | "Ulazna vrata katalog";

export interface ProductSpec {
  label: string;
  value: string;
  tooltipKey?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
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
  thermalbreak: "Termički most (thermal break) je izolaciona barijera unutar aluminijumskog profila koja sprečava provođenje toplote između unutrašnje i spoljašnje strane.",
  liftslide: "Podizno-klizni sistem omogućava lako otvaranje velikih staklenih panela podizanjem i klizanjem, idealan za terase i velike otvore.",
};

export const products: Product[] = [
  // ============ PVC PROZORI ============
  {
    slug: "gealan-s3000",
    name: "GEALAN S-3000",
    category: "PVC",
    subcategory: "Prozori",
    tag: "Ekonomičan izbor",
    heroImage: gealanS3000Image,
    description:
      "GEALAN S-3000 je četvorokomorni PVC profilni sistem koji nudi odličan odnos cene i kvaliteta. Sa dubinom profila od 58mm, idealan je za standardne projekte gde je potrebna pouzdana toplotna i zvučna izolacija bez visokih troškova. Proverena GEALAN tehnologija garantuje dugotrajnost i jednostavno održavanje.",
    features: [
      "4-komorna konstrukcija za solidnu izolaciju",
      "Dubina profila 58 mm – kompaktan dizajn",
      "Uf vrednost od 1.6 W/m²K",
      "2 nivoa zaptivanja",
      "Širok izbor dekora i boja",
      "Ekonomičan izbor za veće projekte",
    ],
    specs: [
      { label: "Uf vrednost", value: "1.6 W/m²K", tooltipKey: "uf" },
      { label: "Dubina profila", value: "58 mm" },
      { label: "Broj komora", value: "4", tooltipKey: "chambers" },
      { label: "Nivoi zaptivanja", value: "2", tooltipKey: "sealing" },
      { label: "Zvučna izolacija", value: "Do 38 dB", tooltipKey: "db" },
      { label: "Namena", value: "Standardni prozori i vrata" },
    ],
    pdfLinks: [
      { label: "GEALAN S-3000 Katalog", url: "#" },
    ],
  },
  {
    slug: "gealan-s9000",
    name: "GEALAN S-9000",
    category: "PVC",
    subcategory: "Prozori",
    tag: "Pasivna kuća",
    heroImage: gealanS9000Image,
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
    slug: "gealan-s7000-iq",
    name: "GEALAN S-7000 IQ",
    category: "PVC",
    subcategory: "Prozori",
    tag: "Premium izolacija",
    heroImage: gealanS7000IqImage,
    description:
      "GEALAN S-7000 IQ je sedmokomorni profilni sistem sa dubinom od 82.5mm koji predstavlja vrhunac PVC tehnologije. Sedam komora obezbeđuje izuzetnu toplotnu izolaciju sa Uf vrednošću od samo 0.95 W/m²K. IQ koncept omogućava montažu bez dodatnog lepljenja zaptivnih guma, što ubrzava proizvodnju i povećava kvalitet.",
    features: [
      "7-komorna konstrukcija – maksimalna izolacija",
      "Uf vrednost od 0.95 W/m²K",
      "IQ koncept – brža i kvalitetnija montaža",
      "3 nivoa zaptivanja",
      "Dubina profila 82.5 mm",
      "Idealan za energetski efikasne objekte",
    ],
    specs: [
      { label: "Uf vrednost", value: "0.95 W/m²K", tooltipKey: "uf" },
      { label: "Dubina profila", value: "82.5 mm" },
      { label: "Broj komora", value: "7", tooltipKey: "chambers" },
      { label: "Nivoi zaptivanja", value: "3", tooltipKey: "sealing" },
      { label: "Zvučna izolacija", value: "Do 47 dB", tooltipKey: "db" },
      { label: "Tehnologija", value: "IQ koncept" },
    ],
    pdfLinks: [
      { label: "GEALAN S-7000 IQ Katalog", url: "#" },
    ],
  },
  {
    slug: "gealan-s8000-iq",
    name: "GEALAN S-8000 IQ",
    category: "PVC",
    subcategory: "Prozori",
    tag: "Pametni profil",
    heroImage: gealanS8000IqImage,
    description:
      "GEALAN S-8000 IQ je šestokomorni profilni sistem sa dubinom od 74mm koji kombinuje kompaktnost sa visokim performansama. IQ tehnologija omogućava mehaničko pričvršćivanje zaptivnih guma umesto lepljenja, čime se postiže trajnija i pouzdanija veza. Idealan izbor za savremene projekte koji zahtevaju optimalan balans između performansi i estetike.",
    features: [
      "6-komorna konstrukcija sa IQ konceptom",
      "Uf vrednost od 1.0 W/m²K",
      "IQ tehnologija – mehanička montaža zaptivki",
      "Kompaktan profil dubine 74 mm",
      "3 nivoa zaptivanja",
      "Dostupan u svim GEALAN dekorima",
    ],
    specs: [
      { label: "Uf vrednost", value: "1.0 W/m²K", tooltipKey: "uf" },
      { label: "Dubina profila", value: "74 mm" },
      { label: "Broj komora", value: "6", tooltipKey: "chambers" },
      { label: "Nivoi zaptivanja", value: "3", tooltipKey: "sealing" },
      { label: "Zvučna izolacija", value: "Do 45 dB", tooltipKey: "db" },
      { label: "Tehnologija", value: "IQ koncept" },
    ],
    pdfLinks: [
      { label: "GEALAN S-8000 IQ Katalog", url: "#" },
    ],
  },
  {
    slug: "gealan-linear",
    name: "GEALAN-LINEAR®",
    category: "PVC",
    subcategory: "Prozori",
    tag: "Moderan dizajn",
    heroImage: gealanLinearImage,
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
    ],
  },

  // ============ ALU PROZORI ============
  {
    slug: "alumil-m11000",
    name: "ALUMIL M 11000",
    category: "ALU",
    subcategory: "Prozori",
    tag: "Termički most",
    heroImage: alumilM11000Image,
    description:
      "ALUMIL M 11000 je aluminijumski profilni sistem sa termičkim prekidom namenjen za prozore i balkonska vrata. Pruža odličnu toplotnu izolaciju zahvaljujući polyamide termičkom mostu, uz elegantnu aluminijumsku estetiku. Pogodan za rezidencijalne i komercijalne objekte koji zahtevaju dugotrajnost i minimalno održavanje aluminijuma.",
    features: [
      "Termički prekid – polyamide izolacija",
      "Uf vrednost od 1.8 do 3.5 W/m²K",
      "Elegantna aluminijumska estetika",
      "Minimalno održavanje",
      "Nagib-otklon i zaokretno otvaranje",
      "Široka paleta RAL boja",
    ],
    specs: [
      { label: "Uf vrednost", value: "1.8 – 3.5 W/m²K", tooltipKey: "uf" },
      { label: "Termički prekid", value: "Polyamide", tooltipKey: "thermalbreak" },
      { label: "Tip otvaranja", value: "Nagib-otklon / Zaokretno" },
      { label: "Materijal", value: "Aluminijum" },
      { label: "Boje", value: "Kompletna RAL paleta" },
      { label: "Namena", value: "Prozori i balkonska vrata" },
    ],
    pdfLinks: [
      { label: "M 11000 Katalog", url: "#" },
    ],
  },
  {
    slug: "alumil-m8000",
    name: "ALUMIL M 8000",
    category: "ALU",
    subcategory: "Prozori",
    tag: "Zaokretni prozori",
    heroImage: "/placeholder.svg",
    description:
      "ALUMIL M 8000 je aluminijumski sistem za zaokretne prozore bez termičkog prekida. Ekonomičan izbor za prostore gde toplotna izolacija nije primarni zahtev – hladne prostorije, magacini, industrijski objekti. Robustan aluminijumski profil garantuje dugotrajnost i otpornost na atmosferske uticaje.",
    features: [
      "Zaokretno otvaranje",
      "Robustan aluminijumski profil",
      "Ekonomičan ALU izbor",
      "Idealan za poslovne i industrijske objekte",
      "Otpornost na koroziju",
      "RAL paleta boja",
    ],
    specs: [
      { label: "Tip sistema", value: "Bez termičkog prekida" },
      { label: "Tip otvaranja", value: "Zaokretno" },
      { label: "Materijal", value: "Aluminijum" },
      { label: "Boje", value: "RAL paleta" },
      { label: "Namena", value: "Industrijski i poslovni objekti" },
      { label: "Održavanje", value: "Minimalno" },
    ],
    pdfLinks: [
      { label: "M 8000 Katalog", url: "#" },
    ],
  },
  {
    slug: "alumil-smartia-s67",
    name: "ALUMIL SMARTIA S67",
    category: "ALU",
    subcategory: "Prozori",
    tag: "Nagib-otklon",
    heroImage: alumilSmartiaS67Image,
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
    ],
  },

  // ============ ALU VRATA ============
  {
    slug: "alumil-supreme-sd77",
    name: "ALUMIL SUPREME SD77",
    category: "ALU",
    subcategory: "Vrata",
    tag: "Ulazna vrata",
    heroImage: alumilSupremeSd77Image,
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
    ],
  },
  {
    slug: "alumil-m11500",
    name: "ALUMIL M 11500",
    category: "ALU",
    subcategory: "Vrata",
    tag: "Ulazna vrata",
    heroImage: alumilM11500Image,
    description:
      "ALUMIL M 11500 je aluminijumski sistem za ulazna vrata sa termičkim prekidom. Pruža visok nivo toplotne izolacije i sigurnosti uz moderan dizajn. Pogodan za rezidencijalne i poslovne objekte koji zahtevaju reprezentativan ulaz sa dugotrajnošću aluminijuma.",
    features: [
      "Termički prekid za bolju izolaciju",
      "Robustan profil za ulazna vrata",
      "Moderan dizajn sa čistim linijama",
      "Višetačkasto zaključavanje",
      "Kompletna RAL paleta boja",
      "Dugotrajnost i minimalno održavanje",
    ],
    specs: [
      { label: "Ud vrednost", value: "Od 1.2 W/m²K", tooltipKey: "ud" },
      { label: "Termički prekid", value: "Da", tooltipKey: "thermalbreak" },
      { label: "Zaključavanje", value: "Višetačkasto" },
      { label: "Materijal", value: "Aluminijum" },
      { label: "Boje", value: "RAL paleta" },
      { label: "Namena", value: "Ulazna vrata" },
    ],
    pdfLinks: [
      { label: "M 11500 Katalog", url: "#" },
    ],
  },
  {
    slug: "alumil-m11600",
    name: "ALUMIL M 11600",
    category: "ALU",
    subcategory: "Vrata",
    tag: "Premium ulaz",
    heroImage: alumilM11600Image,
    description:
      "ALUMIL M 11600 je premium aluminijumski sistem za ulazna vrata sa poboljšanim termičkim performansama. Nudi vrhunsku toplotnu izolaciju, višetačkasto zaključavanje i elegantan dizajn za najzahtevnije projekte. Idealan za luksuzne rezidencijalne objekte.",
    features: [
      "Premium termička izolacija",
      "Višetačkasto sigurnosno zaključavanje",
      "Elegantan dizajn za luksuzne objekte",
      "Duboki profil za maksimalnu stabilnost",
      "Kompletna RAL paleta + specijalne boje",
      "Opcija skrivenih šarki",
    ],
    specs: [
      { label: "Ud vrednost", value: "Od 0.9 W/m²K", tooltipKey: "ud" },
      { label: "Termički prekid", value: "Poboljšani", tooltipKey: "thermalbreak" },
      { label: "Zaključavanje", value: "Višetačkasto sigurnosno" },
      { label: "Materijal", value: "Aluminijum" },
      { label: "Boje", value: "RAL + specijalne" },
      { label: "Namena", value: "Premium ulazna vrata" },
    ],
    pdfLinks: [
      { label: "M 11600 Katalog", url: "#" },
    ],
  },

  // ============ ALU KLIZNI SISTEMI ============
  {
    slug: "alumil-m9050",
    name: "ALUMIL M 9050",
    category: "ALU",
    subcategory: "Klizni sistemi",
    tag: "Klizni sistem",
    heroImage: alumilM9050Image,
    description:
      "ALUMIL M 9050 je aluminijumski klizni sistem dizajniran za velike staklene otvore. Omogućava panoramski pogled i maksimalan prodor prirodne svetlosti. Gladak mehanizam klizanja omogućava lako rukovanje čak i sa velikim staklenim panelima.",
    features: [
      "Klizni sistem za velike staklene površine",
      "Gladak mehanizam klizanja",
      "Maksimalan prodor svetlosti",
      "Termički prekid za energetsku efikasnost",
      "Opcija niskog praga",
      "Idealan za terase i verande",
    ],
    specs: [
      { label: "Tip sistema", value: "Klizni (Sliding)" },
      { label: "Termički prekid", value: "Da", tooltipKey: "thermalbreak" },
      { label: "Maksimalna visina", value: "Do 2700 mm" },
      { label: "Materijal", value: "Aluminijum" },
      { label: "Boje", value: "RAL paleta" },
      { label: "Namena", value: "Terase, verande, veliki otvori" },
    ],
    pdfLinks: [
      { label: "M 9050 Katalog", url: "#" },
    ],
  },
  {
    slug: "alumil-m23300",
    name: "ALUMIL M 23300",
    category: "ALU",
    subcategory: "Klizni sistemi",
    tag: "Podizno-klizni",
    heroImage: alumilM23300Image,
    description:
      "ALUMIL M 23300 je podizno-klizni (Lift & Slide) sistem koji predstavlja vrhunac aluminijumske tehnologije za velike staklene fasade. Mehanizam podizanja omogućava lako otvaranje panela težine do 400kg. Izuzetna vodonepropusnost i zvučna izolacija za maksimalnu udobnost.",
    features: [
      "Podizno-klizni (Lift & Slide) mehanizam",
      "Paneli do 400 kg težine",
      "Izuzetna vodonepropusnost",
      "Vrhunska zvučna izolacija",
      "Termički prekid",
      "Luksuzno rešenje za velike otvore",
    ],
    specs: [
      { label: "Tip sistema", value: "Podizno-klizni (Lift & Slide)", tooltipKey: "liftslide" },
      { label: "Maksimalna težina", value: "Do 400 kg po panelu" },
      { label: "Termički prekid", value: "Da", tooltipKey: "thermalbreak" },
      { label: "Vodonepropusnost", value: "Visoka klasa" },
      { label: "Materijal", value: "Aluminijum" },
      { label: "Namena", value: "Luksuzne rezidencije, hoteli" },
    ],
    pdfLinks: [
      { label: "M 23300 Katalog", url: "#" },
    ],
  },
  {
    slug: "alumil-m300",
    name: "ALUMIL M 300",
    category: "ALU",
    subcategory: "Klizni sistemi",
    tag: "Harmonika vrata",
    heroImage: alumilM300Image,
    description:
      "ALUMIL M 300 je sistem za harmonika (bi-fold) vrata koji omogućava potpuno otvaranje zidnog otvora. Paneli se savijaju jedan na drugi, stvarajući neometan prelaz između unutrašnjeg i spoljašnjeg prostora. Idealan za restorane, kafiće i rezidencijalne terase.",
    features: [
      "Harmonika (bi-fold) otvaranje",
      "Potpuno otvaranje zidnog otvora",
      "Neometan prelaz unutra-spolja",
      "Više konfiguracija panela",
      "Elegantan aluminijumski dizajn",
      "Idealan za ugostiteljstvo i rezidencije",
    ],
    specs: [
      { label: "Tip sistema", value: "Harmonika (Bi-fold)" },
      { label: "Konfiguracija", value: "2-7 panela" },
      { label: "Termički prekid", value: "Da", tooltipKey: "thermalbreak" },
      { label: "Materijal", value: "Aluminijum" },
      { label: "Boje", value: "RAL paleta" },
      { label: "Namena", value: "Terase, restorani, kafići" },
    ],
    pdfLinks: [
      { label: "M 300 Katalog", url: "#" },
    ],
  },

  // ============ ALU FASADE ============
  {
    slug: "alumil-m9400",
    name: "ALUMIL M 9400",
    category: "ALU",
    subcategory: "Fasade",
    tag: "Staklena fasada",
    heroImage: alumilM9400Image,
    description:
      "ALUMIL M 9400 je strukturalni sistem za staklene fasade (curtain wall) koji omogućava izradu velikih staklenih površina na poslovnim i komercijalnim objektima. Sistem nudi odličnu toplotnu izolaciju i vodonepropusnost, uz mogućnost integracije različitih tipova stakla.",
    features: [
      "Strukturalni curtain wall sistem",
      "Za velike staklene fasade",
      "Termički prekid za energetsku efikasnost",
      "Integracija različitih tipova stakla",
      "Otpornost na vetar i kišu",
      "Idealan za poslovne i komercijalne objekte",
    ],
    specs: [
      { label: "Tip sistema", value: "Curtain Wall (Staklena fasada)" },
      { label: "Termički prekid", value: "Da", tooltipKey: "thermalbreak" },
      { label: "Vodonepropusnost", value: "Visoka klasa" },
      { label: "Materijal", value: "Aluminijum" },
      { label: "Boje", value: "RAL paleta" },
      { label: "Namena", value: "Poslovni objekti, tržni centri" },
    ],
    pdfLinks: [
      { label: "M 9400 Katalog", url: "#" },
    ],
  },
  {
    slug: "alumil-m9650",
    name: "ALUMIL M 9650",
    category: "ALU",
    subcategory: "Fasade",
    tag: "Premium fasada",
    heroImage: alumilM9650Image,
    description:
      "ALUMIL M 9650 je premium strukturalni fasadni sistem sa poboljšanim termičkim performansama. Dizajniran za savremene arhitektonske projekte koji zahtevaju maksimalnu energetsku efikasnost uz impresivne staklene površine. Podržava teška stakla i solarne panele.",
    features: [
      "Premium curtain wall sistem",
      "Poboljšane termičke performanse",
      "Podrška za teška stakla i solarne panele",
      "Savremeni arhitektonski dizajn",
      "Visoka otpornost na vetar",
      "Strukturalno zaptivanje",
    ],
    specs: [
      { label: "Tip sistema", value: "Premium Curtain Wall" },
      { label: "Termički prekid", value: "Poboljšani", tooltipKey: "thermalbreak" },
      { label: "Otpornost na vetar", value: "Visoka klasa" },
      { label: "Materijal", value: "Aluminijum" },
      { label: "Staklo", value: "Do 50 mm debljine" },
      { label: "Namena", value: "Arhitektonski projekti, neboderi" },
    ],
    pdfLinks: [
      { label: "M 9650 Katalog", url: "#" },
    ],
  },

  // ============ ALU ROLETNE ============
  {
    slug: "alumil-m5600",
    name: "ALUMIL M 5600",
    category: "ALU",
    subcategory: "Roletne",
    tag: "Roletne",
    heroImage: alumilM5600Image,
    description:
      "ALUMIL M 5600 je aluminijumski sistem za spoljašnje roletne koji pruža dodatnu toplotnu izolaciju, zaštitu od sunca i povećanu sigurnost. Ispunjene poliuretanskom penom, lamele obezbeđuju izuzetnu zvučnu i toplotnu izolaciju. Dostupne u ručnoj i motorizovanoj varijanti.",
    features: [
      "Aluminijumske lamele sa PU penom",
      "Dodatna toplotna i zvučna izolacija",
      "Zaštita od sunca i svetlosti",
      "Povećana sigurnost objekta",
      "Ručna ili motorizovana varijanta",
      "Integracija sa sistemima pametne kuće",
    ],
    specs: [
      { label: "Materijal lamela", value: "Aluminijum + PU pena" },
      { label: "Upravljanje", value: "Ručno / Motorizovano" },
      { label: "Izolacija", value: "Toplotna + zvučna" },
      { label: "Zaštita", value: "Sunce, buka, provala" },
      { label: "Boje", value: "RAL paleta" },
      { label: "Smart integracija", value: "Opciono" },
    ],
    pdfLinks: [
      { label: "M 5600 Katalog", url: "#" },
    ],
  },

  // ============ ULAZNA VRATA KATALOG ============
  {
    slug: "ulazna-vrata-klasicna",
    name: "Ulazna vrata – Klasični modeli",
    category: "ALU",
    subcategory: "Ulazna vrata katalog",
    tag: "Klasičan dizajn",
    heroImage: "/placeholder.svg",
    description:
      "Klasični modeli ulaznih vrata (M 1–M 46) sa tradicionalnim dizajnom koji se uklapa u svaki stil kuće. Dostupni u raznim bojama i završnim obradama, sa kvalitetnom termoizolacijom i višetačkastim zaključavanjem.",
    features: [
      "Tradicionalni dizajn sa panelnim ispunama",
      "Ud vrednost od 1.0 W/m²K",
      "Višetačkasto zaključavanje",
      "Dostupni u RAL paleti boja",
      "Modeli M 1 do M 46",
      "Opcija dekorativnog stakla",
    ],
    specs: [
      { label: "Ud vrednost", value: "1.0 W/m²K", tooltipKey: "ud" },
      { label: "Klasa sigurnosti", value: "RC2", tooltipKey: "rc" },
      { label: "Debljina vrata", value: "68 mm" },
      { label: "Zaključavanje", value: "Višetačkasto" },
      { label: "Boje", value: "RAL paleta" },
      { label: "Modeli", value: "M 1 – M 46" },
    ],
    pdfLinks: [{ label: "Katalog klasičnih modela", url: "#" }],
  },
  {
    slug: "ulazna-vrata-moderna",
    name: "Ulazna vrata – Moderni modeli",
    category: "ALU",
    subcategory: "Ulazna vrata katalog",
    tag: "Moderan dizajn",
    heroImage: "/placeholder.svg",
    description:
      "Moderni modeli ulaznih vrata (M 47–M 92) sa čistim linijama, minimalistčkim dizajnom i velikim staklenim površinama. Idealni za savremenu arhitekturu.",
    features: [
      "Minimalistički dizajn sa čistim linijama",
      "Ud vrednost od 0.9 W/m²K",
      "Velike staklene površine",
      "RC2 sertifikovana sigurnost",
      "Modeli M 47 do M 92",
      "Skrivene šarke (opciono)",
    ],
    specs: [
      { label: "Ud vrednost", value: "0.9 W/m²K", tooltipKey: "ud" },
      { label: "Klasa sigurnosti", value: "RC2", tooltipKey: "rc" },
      { label: "Debljina vrata", value: "73 mm" },
      { label: "Zaključavanje", value: "Višetačkasto + električno" },
      { label: "Boje", value: "RAL + specijalne" },
      { label: "Modeli", value: "M 47 – M 92" },
    ],
    pdfLinks: [{ label: "Katalog modernih modela", url: "#" }],
  },
  {
    slug: "ulazna-vrata-premium",
    name: "Ulazna vrata – Premium modeli",
    category: "ALU",
    subcategory: "Ulazna vrata katalog",
    tag: "Premium izvedba",
    heroImage: "/placeholder.svg",
    description:
      "Premium modeli ulaznih vrata (M 93–M 138) sa najvišim nivoom sigurnosti, izolacije i estetike. Luksuzni materijali, fingerprint pristup i pametne brave.",
    features: [
      "Premium materijali i završna obrada",
      "Ud vrednost od 0.7 W/m²K",
      "RC3 klasa sigurnosti",
      "Fingerprint / pametna brava opcija",
      "Modeli M 93 do M 138",
      "Skrivene šarke i nizak prag",
    ],
    specs: [
      { label: "Ud vrednost", value: "0.7 W/m²K", tooltipKey: "ud" },
      { label: "Klasa sigurnosti", value: "RC3", tooltipKey: "rc" },
      { label: "Debljina vrata", value: "82 mm" },
      { label: "Zaključavanje", value: "Višetačkasto + pametna brava" },
      { label: "Boje", value: "RAL + specijalne + drvo obloge" },
      { label: "Modeli", value: "M 93 – M 138" },
    ],
    pdfLinks: [{ label: "Katalog premium modela", url: "#" }],
  },
];

// Helper to get unique subcategories in display order
export const subcategoryOrder: ProductSubcategory[] = [
  "Prozori",
  "Vrata",
  "Klizni sistemi",
  "Fasade",
  "Roletne",
  "Ulazna vrata katalog",
];

export const subcategoryLabels: Record<ProductSubcategory, string> = {
  Prozori: "Prozori i balkonska vrata",
  Vrata: "Ulazna vrata",
  "Klizni sistemi": "Klizni sistemi",
  Fasade: "Staklene fasade",
  Roletne: "Roletne i zaštita od sunca",
  "Ulazna vrata katalog": "Ulazna vrata – Katalog modela",
};
