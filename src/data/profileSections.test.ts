import { describe, it, expect } from "vitest";
import { s9000Hotspots } from "./profileSections";

describe("s9000Hotspots", () => {
  it("has unique ids and covers the four topics", () => {
    const ids = s9000Hotspots.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort()).toEqual(["chambers", "glass", "seals", "steel"]);
  });

  it("keeps positions within the SVG", () => {
    for (const h of s9000Hotspots) {
      expect(h.x).toBeGreaterThan(0);
      expect(h.x).toBeLessThan(100);
      expect(h.y).toBeGreaterThan(0);
      expect(h.y).toBeLessThan(100);
    }
  });
});
