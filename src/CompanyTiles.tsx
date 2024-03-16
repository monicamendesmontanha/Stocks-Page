import React from "react";

export type Company = {
  id: number;
  name: string;
};

type Props = {
  companies: Company[];
};

const CompanTiles: React.FC<Props> = ({ companies }) => (
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

export default CompanTiles;
