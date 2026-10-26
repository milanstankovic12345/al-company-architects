import { describe, expect, it } from "vitest";
import { visualizerFinishes } from "@/data/finishes";
import { DEFAULT_FINISH_ID, getFinish, shade } from "./finishes";

describe("getFinish", () => {
  it("finds the requested finish", () => {
    expect(getFinish("antracit").name).toBe("Antracit");
  });

  it("falls back to the default for unknown ids", () => {
    expect(getFinish("nema").id).toBe(DEFAULT_FINISH_ID);
  });

  it("has unique ids and includes the required finishes", () => {
    const ids = visualizerFinishes.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(["bela", "antracit", "dekor-zlatni-hrast", "dekor-orah"]));
  });
});

describe("shade", () => {
  it("lightens and darkens", () => {
    expect(shade("#808080", 1)).toBe("#ffffff");
    expect(shade("#808080", -1)).toBe("#000000");
  });

  it("returns invalid input unchanged", () => {
    expect(shade("red", 0.5)).toBe("red");
  });
});
