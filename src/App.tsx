import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { fetchPorts } from "./services/ports";
import { fetchRates } from "./services/rates";
import MultilineChart from "./components/MultilineChart";
import Container from "./components/shared/Container";
import Gradients from "./components/Gradients";
import Grid from "./components/shared/Grid";
import Stack from "./components/shared/Stack";
import MarketPositionList from "./components/MarketPositionList";
import SelectGroup from "./components/SelectGroup";
import Center from "./components/shared/Center";
import Divider from "./components/shared/Divider";

export interface Port {
  code: string;
  name: string;
}
interface ChartDataItem {
  name: string;
  day: string;
  value: number;
}
interface Rate {
  day: string;
  high: number;
  low: number;
  mean: number;
}
interface Input {
  origin: string;
  destination: string;
}
export type Options = Array<{
  label: string;
  value: string;
}>;

function App() {
  const [input, setInput] = useState<Input>({
    origin: "",
    destination: "",
  });
  // which line(s) will be displayed in the chart
  const [selectedLine, setSelectedLine] = useState<Array<string>>(["high"]);
  // ports will be displayed in the select tag
  const [ports, setPorts] = useState<Options>([]);
  // extract the "low", "mean" and "high" attributes into seperate object
  // e.g [{name: "low", day: "2022-01-01", value: 102},{name: "high", day: "2022-01-02", value: 650}]...
  const [dataChart, setDataChart] = useState<Array<ChartDataItem>>([]);

  // fetch ports on mounting
  const { isLoading: isLoadingPorts } = useQuery("ports", fetchPorts, {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (response) =>
      // change the format of the response and store it in the ports state
      setPorts(
        response.map((port: Port) => ({ label: port.name, value: port.code }))
      ),
  });

  // fetch rates
  const {
    data: rates,
    isLoading: isLoadingRates,
    isError: isErrorRates,
  } = useQuery(
    ["rates", input.origin, input.destination],
    () => fetchRates({ origin: input.origin, destination: input.destination }),
    {
      enabled: Boolean(input.origin && input.destination), // this query will be triggered only when origin and destination are selected
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const invertPorts = () => {
    setInput({
      origin: input.destination,
      destination: input.origin,
    });
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    },
    [input]
  );

  const groupByMarketPosition = useCallback(
    (name: "mean" | "low" | "high") => {
      return rates.map((rate: Rate) => ({
        name,
        day: rate.day,
        value: rate[name],
      }));
    },
    [rates]
  );

  useEffect(() => {
    if (rates) {
      // extract the "low", "mean" and "high" attributes into seperate array of object like mentioned above
      const mean = groupByMarketPosition("mean");
      const low = groupByMarketPosition("low");
      const high = groupByMarketPosition("high");

      const chartData = [...mean, ...low, ...high].filter(
        (chart: ChartDataItem) => selectedLine.includes(chart.name)
      );
      setDataChart(chartData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates, selectedLine]);

  const onChangeSelection = useCallback(
    (name: string) => {
      // set the selected line: "low", "high" or "mean"
      const newSelectedLine = selectedLine.includes(name)
        ? selectedLine.filter((item) => item !== name)
        : [...selectedLine, name];
      setSelectedLine(newSelectedLine);
    },
    [selectedLine]
  );

  return (
    <Container>
      <Gradients />
      <Center>
        <Grid gridTemplateColumns={{ base: "1fr", lg: "300px 1fr" }} gap="20px">
          <Stack direction="column" padding="1.5rem" background="white" rounded>
            {/* select and invert button */}
            <SelectGroup
              handleChange={handleChange}
              input={input}
              invertPorts={invertPorts}
              ports={ports}
              loading={isLoadingPorts}
            />
            <Divider />
            {/* checkbox group component */}
            <MarketPositionList
              selectedLine={selectedLine}
              onChangeSelection={onChangeSelection}
            />
          </Stack>
          {/* chart component */}
          <MultilineChart
            isLoading={isLoadingRates}
            isError={isErrorRates}
            data={dataChart}
            selectedLine={selectedLine}
          />
        </Grid>
      </Center>
    </Container>
  );
}

export default App;
