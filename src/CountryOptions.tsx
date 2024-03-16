import React from "react";

type Country = {
  id: string;
  name: string;
};

const contryList: Country[] = [
  {
    id: "global",
    name: "Global",
  },
  {
    id: "us",
    name: "United States",
  },
  {
    id: "au",
    name: "Australia",
  },
  {
    id: "gb",
    name: "United Kingdom",
  },
  {
    id: "ca",
    name: "Canada",
  },
  {
    id: "in",
    name: "India",
  },
  {
    id: "cn",
    name: "China",
  },
  {
    id: "ar",
    name: "Argentina",
  },
  {
    id: "at",
    name: "Austria",
  },
  {
    id: "bh",
    name: "Bahrain",
  },
  {
    id: "bd",
    name: "Bangladesh",
  },
  {
    id: "be",
    name: "Belgium",
  },
  {
    id: "bm",
    name: "Bermuda",
  },
  {
    id: "bw",
    name: "Botswana",
  },
  {
    id: "br",
    name: "Brazil",
  },
  {
    id: "bg",
    name: "Bulgaria",
  },
  {
    id: "cl",
    name: "Chile",
  },
  {
    id: "co",
    name: "Colombia",
  },
  {
    id: "hr",
    name: "Croatia",
  },
  {
    id: "cy",
    name: "Cyprus",
  },
  {
    id: "cz",
    name: "Czech Republic",
  },
  {
    id: "dk",
    name: "Denmark",
  },
  {
    id: "eg",
    name: "Egypt",
  },
  {
    id: "ee",
    name: "Estonia",
  },
  {
    id: "fi",
    name: "Finland",
  },
  {
    id: "fr",
    name: "France",
  },
  {
    id: "de",
    name: "Germany",
  },
  {
    id: "gh",
    name: "Ghana",
  },
  {
    id: "gr",
    name: "Greece",
  },
  {
    id: "hk",
    name: "Hong Kong",
  },
  {
    id: "hu",
    name: "Hungary",
  },
  {
    id: "is",
    name: "Iceland",
  },
  {
    id: "id",
    name: "Indonesia",
  },
  {
    id: "ie",
    name: "Ireland",
  },
  {
    id: "il",
    name: "Israel",
  },
  {
    id: "it",
    name: "Italy",
  },
  {
    id: "ci",
    name: "Ivory Coast",
  },
  {
    id: "jm",
    name: "Jamaica",
  },
  {
    id: "jp",
    name: "Japan",
  },
  {
    id: "jo",
    name: "Jordan",
  },
  {
    id: "ke",
    name: "Kenya",
  },
  {
    id: "kw",
    name: "Kuwait",
  },
  {
    id: "lv",
    name: "Latvia",
  },
  {
    id: "lt",
    name: "Lithuania",
  },
  {
    id: "lu",
    name: "Luxembourg",
  },
  {
    id: "mw",
    name: "Malawi",
  },
  {
    id: "my",
    name: "Malaysia",
  },
  {
    id: "mt",
    name: "Malta",
  },
  {
    id: "mu",
    name: "Mauritius",
  },
  {
    id: "mx",
    name: "Mexico",
  },
  {
    id: "ma",
    name: "Morocco",
  },
  {
    id: "na",
    name: "Namibia",
  },
  {
    id: "nl",
    name: "Netherlands",
  },
  {
    id: "nz",
    name: "New Zealand",
  },
  {
    id: "ng",
    name: "Nigeria",
  },
  {
    id: "no",
    name: "Norway",
  },
  {
    id: "om",
    name: "Oman",
  },
  {
    id: "pk",
    name: "Pakistan",
  },
  {
    id: "ps",
    name: "Palestinian Authority",
  },
  {
    id: "pe",
    name: "Peru",
  },
  {
    id: "ph",
    name: "Philippines",
  },
  {
    id: "pl",
    name: "Poland",
  },
  {
    id: "pt",
    name: "Portugal",
  },
  {
    id: "qa",
    name: "Qatar",
  },
  {
    id: "ro",
    name: "Romania",
  },
  {
    id: "ru",
    name: "Russia",
  },
  {
    id: "sa",
    name: "Saudi Arabia",
  },
  {
    id: "rs",
    name: "Serbia",
  },
  {
    id: "sg",
    name: "Singapore",
  },
  {
    id: "sk",
    name: "Slovakia",
  },
  {
    id: "si",
    name: "Slovenia",
  },
  {
    id: "za",
    name: "South Africa",
  },
  {
    id: "kr",
    name: "South Korea",
  },
  {
    id: "es",
    name: "Spain",
  },
  {
    id: "lk",
    name: "Sri Lanka",
  },
  {
    id: "se",
    name: "Sweden",
  },
  {
    id: "ch",
    name: "Switzerland",
  },
  {
    id: "tw",
    name: "Taiwan",
  },
  {
    id: "tz",
    name: "Tanzania",
  },
  {
    id: "th",
    name: "Thailand",
  },
  {
    id: "tt",
    name: "Trinidad &amp; Tobago",
  },
  {
    id: "tn",
    name: "Tunisia",
  },
  {
    id: "tr",
    name: "Turkey",
  },
  {
    id: "ug",
    name: "Uganda",
  },
  {
    id: "ua",
    name: "Ukraine",
  },
  {
    id: "ae",
    name: "United Arab Emirates",
  },
  {
    id: "ve",
    name: "Venezuela",
  },
  {
    id: "vn",
    name: "Vietnam",
  },
  {
    id: "zm",
    name: "Zambia",
  },
  {
    id: "zw",
    name: "Zimbabwe",
  },
];

type Props = {
  selectedCountryId: string;
  onCountrySelected: (countryId: string) => void;
};

const CountryOptions: React.FC<Props> = ({
  selectedCountryId,
  onCountrySelected,
}) => (
  <select
    value={selectedCountryId}
    onChange={(e) => onCountrySelected(e.target.value)}
  >
    {contryList.map((country) => (
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    ))}
  </select>
);

export default CountryOptions;
