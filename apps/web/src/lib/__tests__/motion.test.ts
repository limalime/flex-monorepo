import { describe, it, expect } from "vitest";
import { fadeUp, fadeLeft, fadeRight, transition } from "../motion";

describe("motion variants", () => {
  describe("fadeUp", () => {
    it("hidden state starts invisible and offset downward", () => {
      expect(fadeUp.hidden).toEqual({ opacity: 0, y: 24 });
    });

    it("visible state is fully opaque at origin", () => {
      expect(fadeUp.visible).toEqual({ opacity: 1, y: 0 });
    });
  });

  describe("fadeLeft", () => {
    it("hidden state starts invisible and offset to the right", () => {
      expect(fadeLeft.hidden).toEqual({ opacity: 0, x: 32 });
    });

    it("visible state is fully opaque at origin", () => {
      expect(fadeLeft.visible).toEqual({ opacity: 1, x: 0 });
    });
  });

  describe("fadeRight", () => {
    it("hidden state starts invisible and offset to the left", () => {
      expect(fadeRight.hidden).toEqual({ opacity: 0, x: -32 });
    });

    it("visible state is fully opaque at origin", () => {
      expect(fadeRight.visible).toEqual({ opacity: 1, x: 0 });
    });
  });

  describe("transition", () => {
    it("has expected duration and easing", () => {
      expect(transition.duration).toBe(0.55);
      expect(transition.ease).toBe("easeOut");
    });
  });
});
