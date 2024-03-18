import React from "react";
import { render, screen } from "@testing-library/react";
import CompanyTiles from "./CompanyTiles";

import ResizeObserver from "resize-observer-polyfill";
global.ResizeObserver = ResizeObserver;

jest.mock("./SnowFlakeScoreGraph", () => {
  return () => <div />;
});

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
