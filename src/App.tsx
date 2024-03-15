import React, { useState, useEffect } from "react";

type Company = {
  id: number;
  name: string;
};

type CompaniesTableProps = {
  companies: Company[];
};

const CompaniesTable: React.FC<CompaniesTableProps> = ({ companies }) => (
  <>
    <table>
      <tr>
        <th>Company Name</th>
        <th>Unique Symbol</th>
        <th>Snowflake Score</th>
        <th>Market Cap</th>
      </tr>
      {companies.map((company) => (
        <tr key={company.id}>
          <td>{company.name}</td>
        </tr>
      ))}
    </table>
  </>
);

export function App() {
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);

    const payload = {
      id: 1,
      no_result_if_limit: false,
      offset,
      size: SIZE,
      state: "read",
      rules: JSON.stringify([
        ["order_by", "market_cap", "desc"],
        ["grid_visible_flag", "=", true],
        ["market_cap", "is_not_null"],
        ["primary_flag", "=", true],
        ["is_fund", "=", false],
        ["aor", [["country_name", "in", ["ca"]]]],
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

    const response = fetch(
      "https://simplywall.st/api/grid/filter?include=grid,score",
      options
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setCompanies([...companies, ...jsonResponse.data]);

        const totalRecords = jsonResponse.meta.total_records;
        setTotalRecords(totalRecords);
        setNumberOfPages(Math.ceil(totalRecords / SIZE));

        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [offset]);

  return (
    <>
      <p>Total records: {totalRecords}</p>
      <CompaniesTable companies={companies} />
    </>
  );
}
