import React from "react";
import './styles.css';

type SnowFakeScore = {
  value: number;
  income: number;
  health: number;
  past: number;
  future: number;
};

export type Company = {
  id: number;
  name: string;
  uniqueSymbol: string;
  marketCap: number;
  snowFlakeScore: SnowFakeScore;
};

type SnowFlakeScoreGraphProps = {
  snowFlakeScore: SnowFakeScore;
};

const SnowFlakeScoreGraph: React.FC<SnowFlakeScoreGraphProps> = ({
  snowFlakeScore,
}) => (
  <span>
    {snowFlakeScore.value} - {snowFlakeScore.income} - {snowFlakeScore.health} -{" "}
    {snowFlakeScore.past} - {snowFlakeScore.future}
  </span>
);

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
