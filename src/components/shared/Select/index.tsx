import { ChangeEvent } from "react";

interface Option {
  label: string;
  value: string | number;
}
interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: Array<Option>;
  name: string;
  placeholder: string;
  disabledOption: string
}

export default function Select({
  value,
  onChange,
  options,
  name,
  placeholder,
  disabledOption
}: Props) {
  return (
    <select value={value} name={name} onChange={onChange}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.filter((option: Option) => option.value !== disabledOption).map((option: Option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
