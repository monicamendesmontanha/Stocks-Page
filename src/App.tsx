import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import countryOptions from "./countryOptions";
import sortingCriteriaOptions from "./sortingCriteriaOptions";
import CompanTiles, { Company } from "./CompanyTiles";

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
    };
  };
};

export function App() {
  const [selectedCountryId, setSelectedCountryId] = useState<string>("au");
  const [selectedSortingCriteria, setSelectedSortingCriteria] =
    useState<string>("desc");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const SIZE = 100;

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
    setTotalRecords(0);
    setNumberOfPages(0);
    setCurrentPage(1);
    setOffset(0);
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
        console.log(jsonResponse);

        const companiesFromResponse: Company[] = jsonResponse.data.map(
          (d: APIData) => {
            return {
              id: d.id,
              name: d.name,
              tickerSymbol: d.ticker_symbol,
              marketCap: d.grid.data.market_cap,
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
      <p>{totalRecords} companies</p>
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
      <CompanTiles companies={companies} />
    </>
  );
}
