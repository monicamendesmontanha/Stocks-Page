import React from "react";
import SnowFlakeScoreGraph, { SnowFakeScore } from "./SnowFlakeScoreGraph";

export type Company = {
  id: number;
  name: string;
  tickerSymbol: string;
  marketCap: number;
  snowFlakeScore: SnowFakeScore;
};

type Props = {
  companies: Company[];
};

const CompanTiles: React.FC<Props> = ({ companies }) => (
  <div className="companyTableContainer">
    <table>
      <tr>
        <th className="companySnowFlakeScoreHeader"></th>
        <th className="companyDetailsHeader">Company</th>
        <th>Market Cap</th>
      </tr>
      {companies.map((company) => (
        <tr key={company.id}>
          <td className="companySnowFlakeScoreContainer">
            <SnowFlakeScoreGraph snowFlakeScore={company.snowFlakeScore} />
          </td>
          <td className="companyDetails">
            <div className="tickerSymbol">{company.tickerSymbol}</div>
            <div>{company.name}</div>
          </td>
          <td>{company.marketCap}</td>
        </tr>
      ))}
    </table>
  </div>
);

export default CompanTiles;
