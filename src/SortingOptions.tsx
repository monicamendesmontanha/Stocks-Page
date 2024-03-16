import React from "react";

type Option = {
  value: string;
  label: string;
};

const options: Option[] = [
  {
    value: "desc",
    label: "Market Cap High to Low",
  },
  {
    value: "asc",
    label: "Market Cap Low to High",
  },
];

type Props = {
  valueSelected: string;
  onValueChange: (value: string) => void;
};

const SortingOptions: React.FC<Props> = ({ valueSelected, onValueChange }) => (
  <select value={valueSelected} onChange={(e) => onValueChange(e.target.value)}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default SortingOptions;
