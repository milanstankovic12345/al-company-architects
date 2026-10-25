import { describe, it, expect } from "vitest";
import { getExperienceYears } from "./experience";

describe("getExperienceYears", () => {
  it("rounds down to a multiple of 5", () => {
    expect(getExperienceYears(new Date(2026, 5, 1))).toBe(20);
    expect(getExperienceYears(new Date(2027, 0, 1))).toBe(25);
  });
});
