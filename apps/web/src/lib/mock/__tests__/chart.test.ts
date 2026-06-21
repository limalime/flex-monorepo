import { describe, it, expect } from "vitest";
import { performanceData } from "../chart";

describe("performanceData mock data", () => {
  it("contains 6 months of data", () => {
    expect(performanceData).toHaveLength(6);
  });

  it("months are in calendar order", () => {
    const months = performanceData.map((d) => d.month);
    expect(months).toEqual(["Jan", "Feb", "Mar", "Apr", "May", "Jun"]);
  });

  it("each entry has all three agent performance values", () => {
    performanceData.forEach((entry) => {
      expect(entry).toHaveProperty("nemotron");
      expect(entry).toHaveProperty("opus");
      expect(entry).toHaveProperty("gemini");
    });
  });

  it("all performance values are positive numbers", () => {
    performanceData.forEach((entry) => {
      expect(entry.nemotron).toBeGreaterThan(0);
      expect(entry.opus).toBeGreaterThan(0);
      expect(entry.gemini).toBeGreaterThan(0);
    });
  });
});
