import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { getPosts } from "./blog";
import { buildLocalBusinessJsonLd } from "./localBusiness";
import { NOINDEX_PATHS, SITE_URL, canonicalUrl } from "./seo";

describe("buildLocalBusinessJsonLd", () => {
  it("includes address, geo and hours", () => {
    const ld = buildLocalBusinessJsonLd();
    expect(ld["@type"]).toBe("LocalBusiness");
    expect(ld.address.streetAddress).toBe("Prva proleterska 60");
    expect(ld.address.postalCode).toBe("14000");
    expect(ld.geo.latitude).toBeGreaterThan(44);
    expect(ld.openingHoursSpecification.length).toBeGreaterThan(0);
  });
});

describe("canonicalUrl", () => {
  it("strips trailing slashes but keeps root", () => {
    expect(canonicalUrl("/")).toBe(SITE_URL + "/");
    expect(canonicalUrl("/kontakt/")).toBe(`${SITE_URL}/kontakt`);
  });
});

describe("sitemap.xml", () => {
  const xml = readFileSync("public/sitemap.xml", "utf8");
  it("lists every product and blog post", () => {
    products.forEach((p) => expect(xml).toContain(`${SITE_URL}/proizvodi/${p.slug}</loc>`));
    getPosts().forEach((p) => expect(xml).toContain(`${SITE_URL}/saveti/${p.slug}</loc>`));
  });
  it("omits noindex routes", () => {
    NOINDEX_PATHS.forEach((p) => expect(xml).not.toContain(`${SITE_URL}${p}<`));
  });
});
