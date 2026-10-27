import { describe, it, expect } from "vitest";
import { products } from "./products";
import { profileSections, hasProfileSection } from "./profileSections";

describe("profileSections", () => {
  it("covers every GEALAN PVC window system", () => {
    for (const slug of ["gealan-s3000", "gealan-s7000-iq", "gealan-s8000-iq", "gealan-linear", "gealan-s9000"]) {
      expect(profileSections[slug]?.kind).toBe("pvc");
    }
  });

  it("covers every ALU product that lists a thermal break and no others", () => {
    for (const p of products.filter((p) => p.category === "ALU")) {
      const hasBreak = p.specs.some((s) => s.label === "Termički prekid");
      expect(hasProfileSection(p.slug)).toBe(hasBreak);
    }
  });

  it("draws PVC chambers and seals from product specs", () => {
    expect(profileSections["gealan-s3000"]).toMatchObject({ chambers: 4, seals: 2 });
    expect(profileSections["gealan-s7000-iq"]).toMatchObject({ chambers: 7, seals: 3 });
  });

  it("has unique hotspot ids and in-range positions", () => {
    for (const section of Object.values(profileSections)) {
      const ids = section.hotspots.map((h) => h.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const h of section.hotspots) {
        expect(h.x).toBeGreaterThan(0);
        expect(h.x).toBeLessThan(100);
        expect(h.y).toBeGreaterThan(0);
        expect(h.y).toBeLessThan(100);
      }
    }
  });
});
