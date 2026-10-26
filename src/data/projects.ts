// TODO: real data from client — all entries below are placeholders.
// Images are temporary stock photos (see CONTENT_CHECK.md); replace titles, locations, years and photos with real projects.

export type ProjectCategory = "kuce" | "stanovi" | "poslovni";
export type ProjectSystem = "pvc" | "alu";

export interface Project {
  id: string;
  title: string;
  location: string;
  category: ProjectCategory;
  system: ProjectSystem;
  /** Image key (see src/lib/images.ts) */
  image: string;
  alt: string;
  /** Optional before/after pair (image keys) shown in the lightbox */
  before?: string;
  after?: string;
  description?: string;
}

export const projects: Project[] = [
  {
    id: "porodicna-kuca-valjevo",
    title: "Porodična kuća",
    location: "Valjevo",
    category: "kuce",
    system: "pvc",
    image: "stock-pvc-window",
    alt: "Porodična kuća u Valjevu sa novim PVC prozorima",
    description: "Zamena kompletne stolarije PVC profilima.",
  },
  {
    id: "vila-sa-terasom",
    title: "Kuća sa terasom",
    location: "Lajkovac",
    category: "kuce",
    system: "alu",
    image: "stock-alu-sliding-terrace",
    alt: "Kuća sa aluminijumskim kliznim zidom na terasi",
    description: "Aluminijumski klizni sistem ka terasi.",
  },
  {
    id: "stan-centar",
    title: "Stan u centru",
    location: "Valjevo",
    category: "stanovi",
    system: "pvc",
    image: "stock-pvc-window",
    alt: "Stan u centru grada sa novim PVC prozorima",
    // TODO: real data from client — placeholder pair, both images are stock
    before: "stock-door-classic",
    after: "stock-pvc-window",
  },
  {
    id: "stan-novi-sad",
    title: "Stan sa lođom",
    location: "Šabac",
    category: "stanovi",
    system: "alu",
    image: "stock-alu-lift-slide",
    alt: "Stan sa aluminijumskim podizno-kliznim vratima na lođi",
  },
  {
    id: "poslovni-prostor",
    title: "Poslovni prostor",
    location: "Valjevo",
    category: "poslovni",
    system: "alu",
    image: "stock-alu-lift-slide",
    alt: "Poslovni prostor sa aluminijumskom fasadnom stolarijom",
  },
  {
    id: "kancelarije",
    title: "Kancelarijski objekat",
    location: "Beograd",
    category: "poslovni",
    system: "alu",
    image: "hero-architecture",
    alt: "Kancelarijski objekat sa aluminijumskom stolarijom",
  },
  {
    id: "kuca-ulazna-vrata",
    title: "Kuća sa novim ulaznim vratima",
    location: "Mionica",
    category: "kuce",
    system: "alu",
    image: "stock-door-modern",
    alt: "Moderna ulazna vrata na porodičnoj kući",
    before: "stock-door-classic",
    after: "stock-door-modern",
  },
  {
    id: "stambena-zgrada",
    title: "Stambena zgrada",
    location: "Ub",
    category: "stanovi",
    system: "pvc",
    image: "stock-door-premium",
    alt: "Stambena zgrada sa zamenjenom PVC stolarijom",
  },
];

export type ProjectFilter = "sve" | ProjectCategory | ProjectSystem;

export const projectFilters: { value: ProjectFilter; label: string }[] = [
  { value: "sve", label: "Svi projekti" },
  { value: "kuce", label: "Kuće" },
  { value: "stanovi", label: "Stanovi" },
  { value: "poslovni", label: "Poslovni objekti" },
  { value: "pvc", label: "PVC" },
  { value: "alu", label: "ALU" },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  kuce: "Kuća",
  stanovi: "Stan",
  poslovni: "Poslovni objekat",
};
