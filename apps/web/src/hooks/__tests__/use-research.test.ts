import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useResearch } from "../use-research";

describe("useResearch", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("starts with null result, no error, and not loading", () => {
    const { result } = renderHook(() => useResearch());

    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("fetches research results on run", async () => {
    const mockResult = {
      recommendation: "YES",
      confidence: 75,
      summary: "Test summary",
      bullCase: ["bull1", "bull2", "bull3"],
      bearCase: ["bear1", "bear2", "bear3"],
    };

    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResult),
    } as Response);

    const { result } = renderHook(() => useResearch());

    await act(async () => {
      await result.current.run("Will ETH hit 10k?");
    });

    expect(globalThis.fetch).toHaveBeenCalledWith("/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "Will ETH hit 10k?" }),
    });

    expect(result.current.result).toEqual(mockResult);
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("sets error when response is not ok", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "Server error" }),
    } as Response);

    const { result } = renderHook(() => useResearch());

    await act(async () => {
      await result.current.run("Will ETH hit 10k?");
    });

    expect(result.current.error).toBe("Server error");
    expect(result.current.result).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("sets fallback error message when response has no error field", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({}),
    } as Response);

    const { result } = renderHook(() => useResearch());

    await act(async () => {
      await result.current.run("question");
    });

    expect(result.current.error).toBe("Research failed");
  });

  it("sets error on network failure", async () => {
    vi.mocked(globalThis.fetch).mockRejectedValue(
      new Error("Network error")
    );

    const { result } = renderHook(() => useResearch());

    await act(async () => {
      await result.current.run("question");
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.isLoading).toBe(false);
  });

  it("handles non-Error thrown values", async () => {
    vi.mocked(globalThis.fetch).mockRejectedValue("string error");

    const { result } = renderHook(() => useResearch());

    await act(async () => {
      await result.current.run("question");
    });

    expect(result.current.error).toBe("Unknown error");
  });
});
