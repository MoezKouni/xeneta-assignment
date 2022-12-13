import { ChangeEvent } from "react";
import StyledSelect from "./styled";

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
  disabledOption: string;
  disabled?: boolean;
}

export default function Select({
  value,
  onChange,
  options,
  name,
  placeholder,
  disabledOption,
  disabled = false
}: Props) {
  return (
    <StyledSelect value={value} name={name} onChange={onChange} disabled={disabled}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.filter((option: Option) => option.value !== disabledOption).map((option: Option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
