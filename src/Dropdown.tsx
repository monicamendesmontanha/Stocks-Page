import React from "react";

export type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  valueSelected: string;
  onValueChange: (value: string) => void;
};

const Dropdown: React.FC<Props> = ({ options, valueSelected, onValueChange }) => (
  <select value={valueSelected} onChange={(e) => onValueChange(e.target.value)}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Dropdown;
