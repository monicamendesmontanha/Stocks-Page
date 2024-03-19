import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown/Dropdown";
import countryOptions from "./CompanyTiles/countryOptions";
import sortingCriteriaOptions from "./sortingCriteriaOptions";
import CompanyTiles, { Company } from "./CompanyTiles/CompanyTiles";
import { APIResponse, APIData, fetchData } from "./apidata";

const SIZE = 10;
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
  const [currentOffset, setCurrentOffset] = useState<number>(INITIAL_OFFSET);
  const [numberOfPages, setNumberOfPages] = useState<number>(
    INITIAL_NUMBER_OF_PAGES
  );
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_CURRENT_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
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
    const nextOffset = nextPage * SIZE - SIZE;
    setCurrentOffset(nextOffset);
  };

  const resetData = () => {
    setCompanies([]);
    setTotalRecords(INITIAL_TOTAL_RECORDS);
    setNumberOfPages(INITIAL_NUMBER_OF_PAGES);
    setCurrentPage(INITIAL_CURRENT_PAGE);
    setCurrentOffset(INITIAL_OFFSET);
    window.removeEventListener("scroll", handleScroll);
  };

  const handleSelectCountry = (value: string) => {
    setSelectedCountryId(value);
    resetData();
  };

  const handleSelectSortingCriteria = (value: string) => {
    setSelectedSortingCriteria(value);
    resetData();
  };

  const loadStocks = async () => {
    setIsLoading(true);
    const jsonResponse: APIResponse = await fetchData({
      countryId: selectedCountryId,
      sortingCriteria: selectedSortingCriteria,
      offset: currentOffset,
      size: SIZE,
    });
    setTotalRecords(jsonResponse.meta.total_records);
    setNumberOfPages(Math.ceil(jsonResponse.meta.total_records / SIZE));
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
    setIsLoading(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    loadStocks();
  }, [currentOffset]);

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
