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
    <button>1</button>
    <button>2</button>
    <button>...</button>
    <button>3309</button>
    <button>Next page</button>
  </>
);

export function App() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const payload = {
      id: 1,
      no_result_if_limit: false,
      offset: 0,
      size: 12,
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
      })
      .catch((error) => console.log(error));
  }, []);

  return <CompaniesTable companies={companies} />;
}
