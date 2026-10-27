import { describe, expect, it } from "vitest";
import { buildArticleJsonLd, getPost, getPosts, parsePost, sortPosts } from "./blog";

const raw =
  "---\ntitle: Naslov\ndescription: Opis: sa dvotačkom\ndate: 2026-01-02\ncategory: Test\nreadMinutes: 5\n---\n\nTelo teksta.\n";

describe("blog", () => {
  it("parses frontmatter and body", () => {
    const p = parsePost("slug", raw);
    expect(p).toMatchObject({
      slug: "slug",
      title: "Naslov",
      description: "Opis: sa dvotačkom",
      date: "2026-01-02",
      readMinutes: 5,
    });
    expect(p.body).toBe("Telo teksta.");
  });

  it("falls back when frontmatter is missing", () => {
    const p = parsePost("x", "Samo tekst");
    expect(p.title).toBe("x");
    expect(p.body).toBe("Samo tekst");
  });

  it("sorts newest first", () => {
    const a = parsePost("a", raw);
    const b = { ...a, slug: "b", date: "2026-05-01" };
    expect(sortPosts([a, b]).map((p) => p.slug)).toEqual(["b", "a"]);
  });

  it("loads the article stubs", () => {
    expect(getPosts().length).toBeGreaterThanOrEqual(2);
    expect(getPost("kako-izabrati-prozore-za-pasivnu-kucu")?.title).toContain("pasivnu");
    expect(getPost("nepostoji")).toBeUndefined();
  });

  it("builds Article JSON-LD", () => {
    const ld = buildArticleJsonLd(parsePost("slug", raw));
    expect(ld["@type"]).toBe("Article");
    expect(ld.mainEntityOfPage).toMatch(/\/saveti\/slug$/);
  });
});
