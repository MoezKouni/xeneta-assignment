import { useCallback, ReactElement } from "react";
import * as Styled from "./styled";
import Stack from "../shared/Stack";
import Heading from "../shared/Heading";

interface Props {
  selectedLine: Array<string>;
  onChangeSelection: (name: string) => void;
}

export default function MarketPositionList({
  selectedLine,
  onChangeSelection,
}: Props): ReactElement {
  const markets = ["low", "mean", "high"];

  const borderColor = useCallback((lineName: string) => {
    switch (lineName) {
      case "low":
        return "#79ffe1";
      case "mean":
        return "#0bade5";
      case "high":
        return "#d5befd";
      default:
        return "#f1b928";
    }
  }, []);

  return (
    <Stack direction="column" padding="1.5rem" background="white" rounded>
      <Heading margin="10px" marginBottom="20px">Market Position</Heading>
      {markets.map((line: string) => (
        <Styled.CheckboxGroup key={line}>
          <Styled.Checkbox
            type="checkbox"
            value={line}
            id={line}
            checked={selectedLine.includes(line)}
            onChange={() => onChangeSelection(line)}
            bg={borderColor(line)}
          />
          <Styled.CustomCheckbox bg={borderColor(line)} />
          <Styled.Label htmlFor={line} isChecked={selectedLine.includes(line)}>
            Market {line}
          </Styled.Label>
        </Styled.CheckboxGroup>
      ))}
    </Stack>
  );
}
