import { describe, it, expect } from "vitest";
import { mainNav, secondaryNav } from "../navigation";

describe("navigation config", () => {
  describe("mainNav", () => {
    it("contains the expected number of items", () => {
      expect(mainNav).toHaveLength(4);
    });

    it("has correct routes", () => {
      const hrefs = mainNav.map((item) => item.href);
      expect(hrefs).toEqual(["/markets", "/agent", "/research", "/dashboard"]);
    });

    it("has correct titles", () => {
      const titles = mainNav.map((item) => item.title);
      expect(titles).toEqual(["Markets", "Agent", "Research", "Dashboard"]);
    });

    it("each item has an icon component", () => {
      mainNav.forEach((item) => {
        expect(item.icon).toBeDefined();
        expect(typeof item.icon).toMatch(/function|object/);
      });
    });
  });

  describe("secondaryNav", () => {
    it("contains the expected number of items", () => {
      expect(secondaryNav).toHaveLength(2);
    });

    it("has correct routes", () => {
      const hrefs = secondaryNav.map((item) => item.href);
      expect(hrefs).toEqual(["/profile", "/settings"]);
    });

    it("has correct titles", () => {
      const titles = secondaryNav.map((item) => item.title);
      expect(titles).toEqual(["Profile", "Settings"]);
    });

    it("each item has an icon component", () => {
      secondaryNav.forEach((item) => {
        expect(item.icon).toBeDefined();
        expect(typeof item.icon).toMatch(/function|object/);
      });
    });
  });
});
