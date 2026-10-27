export interface ProfileHotspot {
  id: "chambers" | "seals" | "steel" | "glass";
  label: string;
  title: string;
  description: string;
  // position over the SVG, in % of its viewBox
  x: number;
  y: number;
}

// Verified S-9000 facts only: 82,5 mm depth, 6 chambers, up to 3 seals, glazing up to 58 mm (see PROGRESS.md P4).
// TODO: confirm steel reinforcement wording and replace the schematic with GEALAN's drawing (needs client/GEALAN asset)
export const s9000Hotspots: ProfileHotspot[] = [
  {
    id: "chambers",
    label: "Komore",
    title: "6 komora",
    description:
      "Šest komora u dubini od 82,5 mm stvara vazdušne džepove koji prekidaju provođenje toplote. Zato S-9000 dostiže Uf do 0,89 W/m²K, što je nivo pasivne kuće.",
    x: 53,
    y: 50,
  },
  {
    id: "seals",
    label: "Zaptivke",
    title: "Do 3 nivoa zaptivanja",
    description:
      "Zaptivke u više nivoa štite od prodora vode, vazduha i buke. Što je više nivoa, to je prozor tiši i hermetičniji.",
    x: 65,
    y: 17,
  },
  {
    id: "steel",
    label: "Čelično ojačanje",
    title: "Čelično ojačanje",
    description:
      "Čelični profil u glavnoj komori daje okviru čvrstinu i stabilnost. STV® tehnologija omogućava i velike elemente bez čeličnog ojačanja.",
    x: 34,
    y: 50,
  },
  {
    id: "glass",
    label: "Staklo",
    title: "Staklo do 58 mm",
    description:
      "Profil prima staklene pakete debljine do 58 mm, što omogućava troslojno zastakljenje sa visokom toplotnom i zvučnom izolacijom.",
    x: 73,
    y: 50,
  },
];
