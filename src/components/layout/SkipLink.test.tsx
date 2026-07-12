import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkipLink } from "./SkipLink";

describe("SkipLink", () => {
  it("links to the main-content landmark", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link", { name: "Pular para o conteúdo principal" });
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("is visually hidden until focused", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link", { name: "Pular para o conteúdo principal" });
    expect(link.className).toContain("sr-only");
    expect(link.className).toContain("focus:not-sr-only");
  });
});
