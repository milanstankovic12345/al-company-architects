import { describe, expect, it } from "vitest";
import { bookingRange, emptyMeasurement, validateDate, validateMeasurement, type MeasurementData } from "./measurementSchema";

// Wednesday 2026-10-21
const NOW = new Date(2026, 9, 21, 10, 0);

const valid: MeasurementData = {
  ...emptyMeasurement,
  town: "valjevo",
  date: "2026-10-23", // Friday
  name: "Petar Petrović",
  phone: "+381 63 123 4567",
  email: "petar@example.com",
  consent: true,
};

describe("validateDate", () => {
  it("accepts tomorrow and a weekday inside the horizon", () => {
    expect(validateDate("2026-10-22", NOW)).toBeNull();
    expect(validateDate("2026-10-23", NOW)).toBeNull();
  });

  it("rejects today, the past, and anything beyond 60 days", () => {
    expect(validateDate("2026-10-21", NOW)).not.toBeNull();
    expect(validateDate("2026-10-01", NOW)).not.toBeNull();
    expect(validateDate("2026-12-21", NOW)).not.toBeNull(); // day 61
    expect(validateDate("2026-12-19", NOW)).toBeNull(); // day 59 (Saturday)
  });

  it("rejects Sundays", () => {
    expect(validateDate("2026-10-25", NOW)).toMatch(/Nedeljom/);
  });

  it("rejects empty and impossible dates", () => {
    expect(validateDate("", NOW)).toBe("Izaberite željeni datum");
    expect(validateDate("2026-02-31", NOW)).toBe("Izaberite ispravan datum");
  });
});

describe("bookingRange", () => {
  it("runs from tomorrow to +60 days", () => {
    expect(bookingRange(NOW)).toEqual({ min: "2026-10-22", max: "2026-12-20" });
  });
});

describe("validateMeasurement", () => {
  it("accepts valid data", () => {
    expect(validateMeasurement(valid, NOW)).toEqual({});
  });

  it("reports every missing required field", () => {
    const errors = validateMeasurement(emptyMeasurement, NOW);
    expect(Object.keys(errors).sort()).toEqual(["consent", "date", "email", "name", "phone", "town"]);
  });

  it("requires a town name when 'Drugo mesto' is chosen", () => {
    expect(validateMeasurement({ ...valid, town: "drugo" }, NOW).otherTown).toBe("Upišite naziv mesta");
    expect(validateMeasurement({ ...valid, town: "drugo", otherTown: "Kosjerić" }, NOW)).toEqual({});
  });

  it("rejects a bad phone and an unticked consent", () => {
    const errors = validateMeasurement({ ...valid, phone: "abc", consent: false }, NOW);
    expect(errors.phone).toMatch(/telefona/);
    expect(errors.consent).toMatch(/saglasnost/);
  });
});
