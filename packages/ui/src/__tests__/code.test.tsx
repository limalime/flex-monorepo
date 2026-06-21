import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Code } from "../code";

describe("Code", () => {
  it("renders children inside a code element", () => {
    render(<Code>{"console.log('hello')"}</Code>);
    const codeElement = screen.getByText("console.log('hello')");
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.tagName).toBe("CODE");
  });

  it("applies custom className", () => {
    render(<Code className="highlight">some code</Code>);
    const codeElement = screen.getByText("some code");
    expect(codeElement).toHaveClass("highlight");
  });

  it("renders without className", () => {
    render(<Code>plain code</Code>);
    const codeElement = screen.getByText("plain code");
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.className).toBe("");
  });

  it("renders nested elements", () => {
    render(
      <Code>
        <span data-testid="inner">nested</span>
      </Code>
    );
    expect(screen.getByTestId("inner")).toBeInTheDocument();
  });
});
