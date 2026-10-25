import { describe, it, expect } from "vitest";
import { calculateSavings } from "./energyCalc";

describe("calculateSavings", () => {
  it("80 m², struja, jednoslojni: realistic payback", () => {
    const r = calculateSavings({ homeSize: 80, heating: "electric", windowType: "single" });
    expect(r.annualSavings).toBe(36960);
    expect(r.paybackYears).toBeGreaterThan(5);
    expect(r.paybackYears).toBeLessThan(12);
  });

  it("cheaper fuel means a longer payback", () => {
    const electric = calculateSavings({ homeSize: 80, heating: "electric", windowType: "single" });
    const wood = calculateSavings({ homeSize: 80, heating: "wood", windowType: "single" });
    expect(wood.paybackYears).toBeGreaterThan(electric.paybackYears);
  });

  it("older windows save more than double-glazed", () => {
    const single = calculateSavings({ homeSize: 120, heating: "gas", windowType: "single" });
    const double = calculateSavings({ homeSize: 120, heating: "gas", windowType: "double" });
    expect(single.annualSavings).toBeGreaterThan(double.annualSavings);
  });

  it("payback does not depend on home size", () => {
    const a = calculateSavings({ homeSize: 50, heating: "gas", windowType: "double" });
    const b = calculateSavings({ homeSize: 300, heating: "gas", windowType: "double" });
    expect(a.paybackYears).toBeCloseTo(b.paybackYears, 1);
  });
});
