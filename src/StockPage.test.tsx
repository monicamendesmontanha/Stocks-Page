// test/Dashboard.test.js

import React from "react";
import {
  vi,
  describe,
  it,
  beforeAll,
  afterAll,
  afterEach,
  expect,
} from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import { StockPage } from "./StockPage";

// This is a workaround for the error "ResizeObserver is not defined"
// Found a solution on https://github.com/ZeeCoder/use-resize-observer/issues/40#issuecomment-1521748205
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

const server = setupServer(
  http.post("https://simplywall.st/api/grid/filter?include=grid,score", () => {
    return HttpResponse.json({
      data: [
        {
          id: 1,
          name: "Company 1",
          ticker_symbol: "C1",
          grid: {
            data: {
              market_cap: 200,
              currency_info: {
                primary_trading_item_currency_symbol: "$",
              },
            },
          },
          score: {
            data: {
              value: 1,
              income: 2,
              health: 3,
              past: 4,
              future: 5,
            },
          },
        },
        {
          id: 2,
          name: "Company 2",
          ticker_symbol: "C2",
          grid: {
            data: {
              market_cap: 100,
              currency_info: {
                primary_trading_item_currency_symbol: "$",
              },
            },
          },
          score: {
            data: {
              value: 1,
              income: 2,
              health: 3,
              past: 4,
              future: 5,
            },
          },
        },
      ],
      meta: {
        total_records: 2,
      },
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("StockPage", () => {
  it("renders company tiles from API response", async () => {
    render(<StockPage />);

    await waitFor(() => {
      expect(screen.getByTestId("company-tiles")).toBeDefined();
    });

    expect(screen.getByText("Company 1")).toBeDefined();
    expect(screen.getByText("Company 2")).toBeDefined();
  });
});
