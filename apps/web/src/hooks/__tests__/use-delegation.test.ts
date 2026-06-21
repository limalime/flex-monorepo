import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDelegation } from "../use-delegation";

describe("useDelegation", () => {
  beforeEach(() => {
    vi.spyOn(Date, "now").mockReturnValue(1700000000000);
    vi.spyOn(Math, "random").mockReturnValue(0.123456789);
  });

  it("starts with empty delegations array", () => {
    const { result } = renderHook(() => useDelegation());
    expect(result.current.delegations).toEqual([]);
  });

  it("creates a delegation with the given limit", async () => {
    const { result } = renderHook(() => useDelegation());

    await act(async () => {
      await result.current.createDelegation(1000);
    });

    expect(result.current.delegations).toHaveLength(1);
    expect(result.current.delegations[0]?.limit).toBe(1000);
    expect(result.current.delegations[0]?.status).toBe("active");
  });

  it("generates an id and createdAt for each delegation", async () => {
    const { result } = renderHook(() => useDelegation());

    await act(async () => {
      await result.current.createDelegation(500);
    });

    const delegation = result.current.delegations[0];
    expect(typeof delegation?.id).toBe("string");
    expect(delegation?.id.length).toBeGreaterThan(0);
    expect(typeof delegation?.createdAt).toBe("number");
  });

  it("prepends new delegations (most recent first)", async () => {
    const { result } = renderHook(() => useDelegation());

    await act(async () => {
      await result.current.createDelegation(100);
    });

    vi.spyOn(Date, "now").mockReturnValue(1700000001000);
    vi.spyOn(Math, "random").mockReturnValue(0.987654321);

    await act(async () => {
      await result.current.createDelegation(200);
    });

    expect(result.current.delegations).toHaveLength(2);
    expect(result.current.delegations[0]?.limit).toBe(200);
    expect(result.current.delegations[1]?.limit).toBe(100);
  });

  it("returns the created delegation from createDelegation", async () => {
    const { result } = renderHook(() => useDelegation());

    let returned: Awaited<
      ReturnType<typeof result.current.createDelegation>
    >;

    await act(async () => {
      returned = await result.current.createDelegation(750);
    });

    expect(returned!).toBeDefined();
    expect(returned!.limit).toBe(750);
    expect(returned!.status).toBe("active");
  });
});
