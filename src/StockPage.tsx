import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown/Dropdown";
import countryOptions from "./CompanyTiles/countryOptions";
import sortingCriteriaOptions from "./sortingCriteriaOptions";
import CompanyTiles, { Company } from "./CompanyTiles/CompanyTiles";

type APIData = {
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

const SIZE = 100;
const INITIAL_COUNTRY_ID = "au";
const INITIAL_SORTING_CRITERIA = "desc";
const INITIAL_TOTAL_RECORDS = 0;
const INITIAL_OFFSET = 0;
const INITIAL_NUMBER_OF_PAGES = 0;
const INITIAL_CURRENT_PAGE = 1;

export const StockPage: React.FC = () => {
  const [selectedCountryId, setSelectedCountryId] =
    useState<string>(INITIAL_COUNTRY_ID);
  const [selectedSortingCriteria, setSelectedSortingCriteria] =
    useState<string>(INITIAL_SORTING_CRITERIA);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(
    INITIAL_TOTAL_RECORDS
  );
  const [offset, setOffset] = useState<number>(INITIAL_OFFSET);
  const [numberOfPages, setNumberOfPages] = useState<number>(
    INITIAL_NUMBER_OF_PAGES
  );
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_CURRENT_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }

    const nextPage = currentPage + 1;
    if (nextPage > numberOfPages) {
      return;
    }

    setCurrentPage(nextPage);
    setOffset(nextPage * SIZE - SIZE);
  };

  const resetData = () => {
    setCompanies([]);
    setTotalRecords(INITIAL_TOTAL_RECORDS);
    setNumberOfPages(INITIAL_NUMBER_OF_PAGES);
    setCurrentPage(INITIAL_CURRENT_PAGE);
    setOffset(INITIAL_OFFSET);
  };

  const handleSelectCountry = (value: string) => {
    setSelectedCountryId(value);
    resetData();
  };

  const handleSelectSortingCriteria = (value: string) => {
    setSelectedSortingCriteria(value);
    resetData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);

    const countryFilter =
      selectedCountryId === "global"
        ? null
        : [["country_name", "in", [selectedCountryId]]];

    const payload = {
      id: 1,
      no_result_if_limit: false,
      offset,
      size: SIZE,
      state: "read",
      rules: JSON.stringify([
        ["order_by", "market_cap", selectedSortingCriteria],
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

    fetch("https://simplywall.st/api/grid/filter?include=grid,score", options)
      .then((response) => response.json())
      .then((jsonResponse) => {
        const companiesFromResponse: Company[] = jsonResponse.data.map(
          (d: APIData) => {
            return {
              id: d.id,
              name: d.name,
              tickerSymbol: d.ticker_symbol,
              marketCap: d.grid.data.market_cap,
              marketCapCurrencySymbol:
                d.grid.data.currency_info.primary_trading_item_currency_symbol,
              snowFlakeScore: {
                value: d.score.data.value,
                income: d.score.data.income,
                health: d.score.data.health,
                past: d.score.data.past,
                future: d.score.data.future,
              },
            };
          }
        );

        setCompanies([...companies, ...companiesFromResponse]);

        const totalRecords = jsonResponse.meta.total_records;
        setTotalRecords(totalRecords);
        setNumberOfPages(Math.ceil(totalRecords / SIZE));

        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [offset, selectedCountryId, selectedSortingCriteria]);

  return (
    <>
      <header className="header">
        <h1>Largest Stocks by Market Cap</h1>
        <p className="subtitle">{totalRecords} companies</p>
      </header>
      <section className="section">
        <Dropdown
          options={countryOptions}
          valueSelected={selectedCountryId}
          onValueChange={handleSelectCountry}
        />
        <Dropdown
          options={sortingCriteriaOptions}
          valueSelected={selectedSortingCriteria}
          onValueChange={handleSelectSortingCriteria}
        />
      </section>
      <CompanyTiles companies={companies} countryId={selectedCountryId} />
    </>
  );
};
