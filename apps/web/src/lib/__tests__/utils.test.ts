import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("handles conditional classes", () => {
    const showPadding = false;
    expect(cn("px-2", showPadding && "py-1")).toBe("px-2");

    const showMargin = true;
    expect(cn("px-2", showMargin && "py-1")).toBe("px-2 py-1");
  });

  it("resolves tailwind conflicts with last-wins", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles undefined and null inputs", () => {
    expect(cn("px-2", undefined, null, "py-1")).toBe("px-2 py-1");
  });

  it("handles empty string inputs", () => {
    expect(cn("", "px-2")).toBe("px-2");
  });

  it("handles no arguments", () => {
    expect(cn()).toBe("");
  });

  it("handles array inputs", () => {
    expect(cn(["px-2", "py-1"])).toBe("px-2 py-1");
  });
});
