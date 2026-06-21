import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button appName="TestApp">Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders as a button element", () => {
    render(<Button appName="TestApp">Text</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Button appName="TestApp" className="custom-class">
        Text
      </Button>
    );
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("shows an alert with appName on click", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Button appName="MyApp">Click</Button>);
    fireEvent.click(screen.getByRole("button"));

    expect(alertSpy).toHaveBeenCalledWith("Hello from your MyApp app!");
    alertSpy.mockRestore();
  });

  it("includes appName in the alert message", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<Button appName="AnotherApp">Click</Button>);
    fireEvent.click(screen.getByRole("button"));

    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringContaining("AnotherApp")
    );
    alertSpy.mockRestore();
  });
});
