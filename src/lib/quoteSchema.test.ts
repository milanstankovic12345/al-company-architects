import { describe, expect, it } from "vitest";
import { emptyQuote, validatePhotos, validateStep } from "./quoteSchema";

const file = (name: string, type: string, size: number) => new File([new Uint8Array(size)], name, { type });

describe("quote wizard validation", () => {
  it("requires a product and material", () => {
    expect(validateStep(0, emptyQuote).product).toBe("Izaberite tip proizvoda");
    expect(validateStep(0, { ...emptyQuote, product: "prozor" })).toEqual({});
    expect(validateStep(1, emptyQuote).material).toBe("Izaberite materijal");
    expect(validateStep(1, { ...emptyQuote, material: "pvc" })).toEqual({});
  });

  it("validates dimensions and quantity", () => {
    const e = validateStep(2, { ...emptyQuote, width: "50", height: "abc", quantity: "0" });
    expect(e.width).toMatch(/300 i 6000/);
    expect(e.height).toMatch(/ciframa/);
    expect(e.quantity).toMatch(/1 do 99/);
    expect(validateStep(2, { ...emptyQuote, width: "1200", height: "1400", quantity: "3" })).toEqual({});
  });

  it("requires a finish", () => {
    expect(validateStep(3, emptyQuote).finish).toBeDefined();
    expect(validateStep(3, { ...emptyQuote, finish: "bela" })).toEqual({});
  });

  it("validates contact details and consent", () => {
    const e = validateStep(5, emptyQuote);
    expect(Object.keys(e)).toEqual(expect.arrayContaining(["name", "email", "phone", "consent"]));
    const ok = { ...emptyQuote, name: "Petar Petrović", email: "p@example.com", phone: "+381 63 123 4567", consent: true };
    expect(validateStep(5, ok)).toEqual({});
  });

  it("checks photo count, type and size", () => {
    expect(validatePhotos([file("a.jpg", "image/jpeg", 10)])).toBeNull();
    expect(validatePhotos([file("a.pdf", "application/pdf", 10)])).toMatch(/format/);
    expect(validatePhotos([file("a.jpg", "image/jpeg", 6 * 1024 * 1024)])).toMatch(/5 MB/);
    expect(validatePhotos(Array.from({ length: 4 }, (_, i) => file(`${i}.jpg`, "image/jpeg", 10)))).toMatch(/najviše 3/);
  });
});
