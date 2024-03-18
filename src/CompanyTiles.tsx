import React from "react";
import SnowFlakeScoreGraph, { SnowFakeScore } from "./SnowFlakeScoreGraph";

export type Company = {
  id: number;
  name: string;
  tickerSymbol: string;
  marketCap: number;
  marketCapCurrencySymbol: string;
  snowFlakeScore: SnowFakeScore;
};

type Props = {
  companies: Company[];
  countryId: string;
};

const convertValueToCurrency = (
  value: number,
  countryId: string,
  currencySymbol: string
) => {
  const formattedValue = new Intl.NumberFormat(countryId, {
    notation: "compact",
    maximumSignificantDigits: 4,
  }).format(value);

  return `${currencySymbol}${formattedValue.toLocaleLowerCase()}`;
};

const CompanTiles: React.FC<Props> = ({ companies, countryId }) => (
  <div className="companyTableContainer">
    <table>
      <thead>
        <tr>
          <th className="companySnowFlakeScoreHeader"></th>
          <th className="companyDetailsHeader">Company</th>
          <th className="marketCapDetailsHeader">Market Cap</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <tr key={company.id}>
            <td className="companySnowFlakeScoreContainer">
              <SnowFlakeScoreGraph snowFlakeScore={company.snowFlakeScore} />
            </td>
            <td className="companyDetails">
              <div className="tickerSymbol">{company.tickerSymbol}</div>
              <div className="companyName">{company.name}</div>
            </td>
            <td>
              {convertValueToCurrency(
                company.marketCap,
                countryId,
                company.marketCapCurrencySymbol
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CompanTiles;
