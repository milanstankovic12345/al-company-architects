import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CountUp from "./CountUp";
import { formatCount } from "@/lib/formatCount";

describe("formatCount", () => {
  it("uses Serbian thousand separator", () => {
    expect(formatCount(15000)).toBe("15.000");
  });

  it("keeps decimals with a comma", () => {
    expect(formatCount(0.72, 2)).toBe("0,72");
  });
});

describe("CountUp", () => {
  it("exposes the final value with suffix to assistive tech", () => {
    render(<CountUp value={15000} suffix="+" />);
    expect(screen.getAllByText("15.000+").length).toBeGreaterThan(0);
  });

  it("renders the dB suffix", () => {
    render(<CountUp value={47} suffix="dB" />);
    expect(screen.getAllByText("47dB").length).toBeGreaterThan(0);
  });
});
