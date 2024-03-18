import React from "react";
import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CompanyTiles from "./CompanyTiles";

// This is a workaround for the error "ResizeObserver is not defined"
// Found a solution on https://github.com/ZeeCoder/use-resize-observer/issues/40#issuecomment-1521748205
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

vi.stubGlobal('ResizeObserver', ResizeObserverMock)

describe("CompanyTiles", () => {
  it("renders headers", () => {
    render(<CompanyTiles companies={[]} countryId="au" />);

    expect(screen.getByText("Company")).toBeDefined();
    expect(screen.getByText("Market Cap")).toBeDefined();
  });

  it("renders company data", () => {
    const companies = [
      {
        id: 1,
        name: "Company 1",
        tickerSymbol: "C1",
        marketCap: 100,
        marketCapCurrencySymbol: "$",
        snowFlakeScore: {
          value: 1,
          income: 2,
          health: 3,
          past: 4,
          future: 5,
        },
      },
      {
        id: 2,
        name: "Company 2",
        tickerSymbol: "C2",
        marketCap: 99,
        marketCapCurrencySymbol: "A$",
        snowFlakeScore: {
          value: 1,
          income: 2,
          health: 3,
          past: 4,
          future: 5,
        },
      },
    ];
    render(<CompanyTiles companies={companies} countryId="au" />);

    expect(screen.getByText("Company 1")).toBeDefined();
    expect(screen.getByText("C1")).toBeDefined();

    expect(screen.getByText("Company 2")).toBeDefined();
    expect(screen.getByText("C2")).toBeDefined();
  });
});
