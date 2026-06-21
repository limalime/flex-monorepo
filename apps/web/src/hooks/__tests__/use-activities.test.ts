import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useActivities } from "../use-activities";

beforeEach(() => {
  vi.stubGlobal(
    "crypto",
    Object.assign({}, globalThis.crypto, {
      randomUUID: vi.fn(() => "test-uuid-123"),
    })
  );
});

describe("useActivities", () => {
  it("starts with an empty activities list", () => {
    const { result } = renderHook(() => useActivities());
    expect(result.current.activities).toEqual([]);
  });

  it("adds an activity with title and description", () => {
    const { result } = renderHook(() => useActivities());

    act(() => {
      result.current.addActivity("Test Title", "Test Description");
    });

    expect(result.current.activities).toHaveLength(1);
    expect(result.current.activities[0]?.title).toBe("Test Title");
    expect(result.current.activities[0]?.description).toBe("Test Description");
  });

  it("assigns an id and createdAt timestamp to each activity", () => {
    const { result } = renderHook(() => useActivities());

    act(() => {
      result.current.addActivity("Title", "Desc");
    });

    const activity = result.current.activities[0];
    expect(activity?.id).toBe("test-uuid-123");
    expect(typeof activity?.createdAt).toBe("number");
  });

  it("prepends new activities (most recent first)", () => {
    vi.mocked(globalThis.crypto.randomUUID)
      .mockReturnValueOnce("uuid-1" as ReturnType<typeof crypto.randomUUID>)
      .mockReturnValueOnce("uuid-2" as ReturnType<typeof crypto.randomUUID>);

    const { result } = renderHook(() => useActivities());

    act(() => {
      result.current.addActivity("First", "First desc");
    });
    act(() => {
      result.current.addActivity("Second", "Second desc");
    });

    expect(result.current.activities).toHaveLength(2);
    expect(result.current.activities[0]?.title).toBe("Second");
    expect(result.current.activities[1]?.title).toBe("First");
  });
});
