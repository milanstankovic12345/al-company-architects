import { products, techExplanations } from "@/data/products";

export type HotspotId = "chambers" | "seals" | "steel" | "glass" | "thermalbreak" | "shells";

export interface ProfileHotspot {
  id: HotspotId;
  label: string;
  title: string;
  description: string;
  // position over the SVG, in % of its viewBox
  x: number;
  y: number;
}

export interface ProfileSection {
  kind: "pvc" | "alu";
  name: string;
  chambers: number; // pvc only
  seals: number; // pvc only
  depth?: string; // pvc only, e.g. "82,5 mm"
  hotspots: ProfileHotspot[];
}

const spec = (slug: string, label: string) =>
  products.find((p) => p.slug === slug)?.specs.find((s) => s.label === label)?.value;

// Drawings are schematic (no official GEALAN/ALUMIL section assets in the repo); numbers come from products.ts specs.
// TODO: confirm steel reinforcement wording and replace the schematics with manufacturer drawings (needs client/manufacturer asset)
const pvcSlugs = ["gealan-s3000", "gealan-s7000-iq", "gealan-s8000-iq", "gealan-linear", "gealan-s9000"];

const buildPvc = (slug: string): ProfileSection | null => {
  const product = products.find((p) => p.slug === slug);
  const chambers = parseInt(spec(slug, "Broj komora") ?? "", 10);
  const seals = parseInt(spec(slug, "Nivoi zaptivanja") ?? "", 10);
  if (!product || !chambers || !seals) return null;
  const depth = spec(slug, "Dubina profila");
  const isS9000 = slug === "gealan-s9000";

  return {
    kind: "pvc",
    name: product.name,
    chambers,
    seals,
    depth,
    hotspots: [
      {
        id: "chambers",
        label: "Komore",
        title: `${chambers} komora`,
        description: `${chambers} komora${depth ? ` u dubini od ${depth}` : ""} stvara vazdušne džepove koji prekidaju provođenje toplote${
          spec(slug, "Uf vrednost") ? `. Uf vrednost sistema: ${spec(slug, "Uf vrednost")}` : ""
        }.`,
        x: 52,
        y: 50,
      },
      {
        id: "seals",
        label: "Zaptivke",
        title: `${seals} nivoa zaptivanja`,
        description: `Zaptivke u ${seals} nivoa štite od prodora vode, vazduha i buke. Što je više nivoa, to je prozor tiši i hermetičniji.`,
        x: 65,
        y: 17,
      },
      {
        id: "steel",
        label: "Čelično ojačanje",
        title: "Čelično ojačanje",
        description: isS9000
          ? "Čelični profil u glavnoj komori daje okviru čvrstinu i stabilnost. STV® tehnologija omogućava i velike elemente bez čeličnog ojačanja."
          : "Čelični profil u glavnoj komori daje okviru čvrstinu i stabilnost, posebno kod većih prozora i vrata.",
        x: 34,
        y: 50,
      },
      {
        id: "glass",
        label: "Staklo",
        title: isS9000 ? "Staklo do 58 mm" : "Staklo",
        description: isS9000
          ? "Profil prima staklene pakete debljine do 58 mm, što omogućava troslojno zastakljenje sa visokom toplotnom i zvučnom izolacijom."
          : "Staklo je ugrađeno u okvir sa zaptivkama; izbor staklenog paketa određuje ukupnu izolaciju prozora.",
        x: 73,
        y: 50,
      },
    ],
  };
};

const buildAlu = (slug: string): ProfileSection | null => {
  const product = products.find((p) => p.slug === slug);
  const tb = spec(slug, "Termički prekid");
  if (!product || !tb) return null;

  return {
    kind: "alu",
    name: product.name,
    chambers: 0,
    seals: 0,
    hotspots: [
      {
        id: "thermalbreak",
        label: "Termički prekid",
        title: tb === "Da" ? "Termički prekid" : `Termički prekid (${tb})`,
        description: techExplanations.thermalbreak,
        x: 36,
        y: 25,
      },
      {
        id: "shells",
        label: "Aluminijumski profil",
        title: "Unutrašnja i spoljašnja ljuska",
        description:
          "Aluminijumski profil je podeljen na unutrašnju i spoljašnju ljusku koje povezuje izolacioni termički prekid. Aluminijum je čvrst, otporan na koroziju i traži minimalno održavanje.",
        x: 22,
        y: 50,
      },
      {
        id: "glass",
        label: "Staklo",
        title: "Staklo",
        description: "Staklo je ugrađeno u okvir sa zaptivkama; izbor staklenog paketa određuje ukupnu izolaciju.",
        x: 73,
        y: 50,
      },
    ],
  };
};

const aluSlugs = products.filter((p) => p.category === "ALU" && spec(p.slug, "Termički prekid")).map((p) => p.slug);

export const profileSections: Record<string, ProfileSection> = Object.fromEntries(
  [...pvcSlugs.map((s) => [s, buildPvc(s)] as const), ...aluSlugs.map((s) => [s, buildAlu(s)] as const)].filter(
    (e): e is [string, ProfileSection] => e[1] !== null,
  ),
);

export const hasProfileSection = (slug?: string) => !!slug && slug in profileSections;
