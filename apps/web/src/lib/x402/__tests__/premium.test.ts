import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchPremiumResearch } from "../premium";

describe("fetchPremiumResearch", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("calls /api/research/premium with POST method", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          riskLevel: "Medium",
          marketSignals: ["signal1"],
          strategy: "test strategy",
        }),
    } as Response);

    await fetchPremiumResearch();

    expect(globalThis.fetch).toHaveBeenCalledWith("/api/research/premium", {
      method: "POST",
    });
  });

  it("returns parsed JSON on success", async () => {
    const mockData = {
      riskLevel: "High",
      marketSignals: ["signal1", "signal2"],
      strategy: "aggressive strategy",
    };

    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const result = await fetchPremiumResearch();
    expect(result).toEqual(mockData);
  });

  it("throws when response is not ok", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(fetchPremiumResearch()).rejects.toThrow(
      "Premium request failed"
    );
  });
});
