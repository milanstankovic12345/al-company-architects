import type { Project, ProjectFilter } from "@/data/projects";

export const filterProjects = (items: Project[], filter: ProjectFilter): Project[] =>
  filter === "sve" ? items : items.filter((p) => p.category === filter || p.system === filter);

/** Wraps an index into [0, length) so prev/next in the lightbox loops around. */
export const wrapIndex = (index: number, length: number): number =>
  length <= 0 ? 0 : ((index % length) + length) % length;
