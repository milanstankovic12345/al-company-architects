import { describe, expect, it } from "vitest";
import { faqItems, faqTopics } from "@/data/faq";
import { buildFaqJsonLd } from "./faq";

describe("buildFaqJsonLd", () => {
  it("builds a FAQPage with one Question per item", () => {
    const ld = buildFaqJsonLd(faqItems);
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity).toHaveLength(faqItems.length);
    expect(ld.mainEntity[0].acceptedAnswer.text).toBe(faqItems[0].answer);
  });

  it("has no empty questions/answers and unique ids", () => {
    faqItems.forEach((i) => {
      expect(i.question.trim()).not.toBe("");
      expect(i.answer.trim()).not.toBe("");
    });
    expect(new Set(faqItems.map((i) => i.id)).size).toBe(faqItems.length);
  });

  it("covers the required topics", () => {
    expect(faqTopics).toEqual([
      "Cene",
      "Rokovi isporuke",
      "Garancija",
      "Održavanje",
      "Subvencije",
      "Montaža zimi",
    ]);
  });
});
