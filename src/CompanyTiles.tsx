import React from "react";

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
      <tr>
        <th>Company Name</th>
        <th>Unique Symbol</th>
        <th>Market Cap</th>
      </tr>
      {companies.map((company) => (
        <tr key={company.id}>
          <td>
            <SnowFlakeScoreGraph snowFlakeScore={company.snowFlakeScore} />
            <span>{company.name}</span>
          </td>
          <td>{company.uniqueSymbol}</td>
          <td>{company.marketCap}</td>
        </tr>
      ))}
    </table>
  </>
);

export default CompanTiles;
