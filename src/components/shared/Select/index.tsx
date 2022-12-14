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
  disabledOption?: string;
  loading?: boolean;
}

export default function Select({
  value,
  onChange,
  options,
  name,
  placeholder,
  disabledOption,
  loading,
}: Props) {
  return (
    <StyledSelect
      value={value}
      name={name}
      onChange={onChange}
      disabled={loading}
    >
      <option value="" disabled>
        {loading ? "Loading..." : placeholder}
      </option>
      {options
        .filter((option: Option) => option.value !== disabledOption) // remove the selected option in the other select tag, to prevent the selection of the same Port from happening
        .map((option: Option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
    </StyledSelect>
  );
}
