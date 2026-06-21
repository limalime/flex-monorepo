import { describe, it, expect } from "vitest";
import { featuredMarkets } from "../markets";

describe("featuredMarkets mock data", () => {
  it("contains the expected number of markets", () => {
    expect(featuredMarkets).toHaveLength(3);
  });

  it("each market has required fields", () => {
    featuredMarkets.forEach((market) => {
      expect(market).toHaveProperty("id");
      expect(market).toHaveProperty("question");
      expect(market).toHaveProperty("yesProbability");
      expect(market).toHaveProperty("noProbability");
      expect(market).toHaveProperty("volume");
      expect(market).toHaveProperty("category");
    });
  });

  it("probabilities are valid numbers between 0 and 100", () => {
    featuredMarkets.forEach((market) => {
      expect(market.yesProbability).toBeGreaterThanOrEqual(0);
      expect(market.yesProbability).toBeLessThanOrEqual(100);
      expect(market.noProbability).toBeGreaterThanOrEqual(0);
      expect(market.noProbability).toBeLessThanOrEqual(100);
    });
  });

  it("each market has a unique id", () => {
    const ids = featuredMarkets.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each market has a non-empty question", () => {
    featuredMarkets.forEach((market) => {
      expect(market.question.length).toBeGreaterThan(0);
    });
  });

  it("volumes are formatted as dollar strings", () => {
    featuredMarkets.forEach((market) => {
      expect(market.volume).toMatch(/^\$/);
    });
  });
});
