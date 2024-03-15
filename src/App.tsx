import React, { useState, useEffect } from "react";

type Company = {
  id: number;
  name: string;
};

type CompaniesTableProps = {
  companies: Company[];
  totalRecords: number;
  numberOfPages: number;
};

type PaginationProps = {
  numberOfPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ numberOfPages }) => (
  <>
    {Array.from({ length: numberOfPages }).map((_, i) => (
      <button>{i + 1}</button>
    ))}
  </>
);

const CompaniesTable: React.FC<CompaniesTableProps> = ({
  companies,
  totalRecords,
  numberOfPages,
}) => (
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
    <Pagination numberOfPages={numberOfPages} />
    <p>Total records: {totalRecords}</p>
  </>
);

export function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  const SIZE = 100;

  useEffect(() => {
    const payload = {
      id: 1,
      no_result_if_limit: false,
      offset: 0,
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

    fetch("https://simplywall.st/api/grid/filter?include=grid,score", options)
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setCompanies(jsonResponse.data);

        const totalRecords = jsonResponse.meta.total_records;
        setTotalRecords(totalRecords);
        setNumberOfPages(Math.ceil(totalRecords / SIZE));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <CompaniesTable
      companies={companies}
      totalRecords={totalRecords}
      numberOfPages={numberOfPages}
    />
  );
}
