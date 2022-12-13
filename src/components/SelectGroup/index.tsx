import { ChangeEvent } from "react";
import Select from "../shared/Select";
import { ReactComponent as ExchangeIcon } from "../../exchange.svg"
import Button from "../shared/Button";
import Stack from "../shared/Stack";

interface Props {
  input: {
    origin: string;
    destination: string;
  };
  ports: Array<{
    label: string;
    value: string;
  }>;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  invertPorts: () => void;
  loading: boolean;
}

export default function SelectGroup({
  input,
  handleChange,
  ports,
  invertPorts,
  loading,
}: Props) {
  return (
    <Stack direction="column">
      <Select
        name="origin"
        value={input.origin}
        onChange={handleChange}
        disabledOption={input.destination}
        placeholder={loading ? "Loading..." : "Choose an origin"}
        disabled={loading}
        options={ports}
      />
      <Button onClick={invertPorts}><ExchangeIcon /></Button>
      <Select
        name="destination"
        value={input.destination}
        onChange={handleChange}
        disabledOption={input.origin}
        placeholder={loading ? "Loading..." : "Choose a destination"}
        disabled={loading}
        options={ports}
      />
    </Stack>
  );
}
