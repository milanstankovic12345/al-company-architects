import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { filterProjects, wrapIndex } from "./projects";

describe("filterProjects", () => {
  it("returns everything for 'sve'", () => {
    expect(filterProjects(projects, "sve")).toHaveLength(projects.length);
  });

  it("filters by category", () => {
    const result = filterProjects(projects, "kuce");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.category === "kuce")).toBe(true);
  });

  it("filters by system", () => {
    const result = filterProjects(projects, "pvc");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.system === "pvc")).toBe(true);
  });
});

describe("wrapIndex", () => {
  it("wraps forwards and backwards", () => {
    expect(wrapIndex(3, 3)).toBe(0);
    expect(wrapIndex(-1, 3)).toBe(2);
    expect(wrapIndex(1, 3)).toBe(1);
  });

  it("is safe for empty lists", () => {
    expect(wrapIndex(2, 0)).toBe(0);
  });
});
