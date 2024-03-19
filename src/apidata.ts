export type APIData = {
  id: number;
  name: string;
  ticker_symbol: string;
  score: {
    data: {
      value: number;
      income: number;
      health: number;
      past: number;
      future: number;
    };
  };
  grid: {
    data: {
      market_cap: number;
      currency_info: {
        primary_trading_item_currency_symbol: string;
      };
    };
  };
};

export type APIMeta = {
  total_records: number;
}

export type APIResponse = {
  data: APIData[];
  meta: APIMeta;
}

type FetchDataParams = {
  countryId: string;
  sortingCriteria: string;
  offset: number;
  size: number;
};

export const fetchData = async ({
  countryId,
  sortingCriteria,
  offset,
  size,
}: FetchDataParams) => {
  const countryFilter =
    countryId === "global" ? null : [["country_name", "in", [countryId]]];

  const payload = {
    id: 1,
    no_result_if_limit: false,
    offset,
    size,
    state: "read",
    rules: JSON.stringify([
      ["order_by", "market_cap", sortingCriteria],
      ["grid_visible_flag", "=", true],
      ["market_cap", "is_not_null"],
      ["primary_flag", "=", true],
      ["is_fund", "=", false],
      ["aor", countryFilter],
    ]),
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      sws: "fe-challenge",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(
    "https://simplywall.st/api/grid/filter?include=grid,score",
    options
  );

  return response.json();
};
