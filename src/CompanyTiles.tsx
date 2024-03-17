import React from "react";
import "./styles.css";
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
  <>
    <table>
      <tr className="thead">
        <th></th>
        <div>
          <th></th>
          <th>Company</th>
        </div>
        <th>Market Cap</th>
      </tr>
      {companies.map((company) => (
        <tr key={company.id}>
          <td>
            <SnowFlakeScoreGraph snowFlakeScore={company.snowFlakeScore} />
          </td>
          <td className="company">
            <div className="companySymbol">{company.uniqueSymbol}</div>
            <div className="companyName">{company.name}</div>
          </td>
          <td>{company.marketCap}</td>
        </tr>
      ))}
    </table>
  </>
);

export default CompanTiles;
