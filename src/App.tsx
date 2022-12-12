import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { fetchPorts } from "./services/ports";
import { fetchRates } from "./services/rates";
import MultilineChart from "./components/MultilineChart";
import Container from "./components/shared/Container";
import Gradients from "./components/Gradients";
import Select from "./components/shared/Select";
import Grid from "./components/shared/Grid";
import Stack from "./components/shared/Stack";
import MarketPositionList from "./components/MarketPositionList";

interface Port {
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

function App() {
  const [input, setInput] = useState<Input>({
    origin: "",
    destination: "",
  });
  const [selectedLine, setSelectedLine] = useState<Array<string>>(["high"]);
  const [ports, setPorts] = useState<Array<{ label: string; value: string }>>(
    []
  );
  const [dataChart, setDataChart] = useState<Array<ChartDataItem>>([]);

  const { isLoading: isLoadingPorts } = useQuery("ports", fetchPorts, {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (response) =>
      setPorts(
        response.map((port: Port) => ({ label: port.name, value: port.code }))
      ),
  });

  const {
    data: rates,
    isLoading: isLoadingRates,
    isError: isErrorRates,
  } = useQuery(
    ["rates", input.origin, input.destination],
    () => fetchRates({ origin: input.origin, destination: input.destination }),
    {
      enabled: Boolean(input.origin && input.destination),
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

  useEffect(() => {
    if (rates) {
      const mean = rates.map((rate: Rate) => ({
        name: "mean",
        day: rate.day,
        value: rate.mean,
      }));
      const low = rates.map((rate: Rate) => ({
        name: "low",
        day: rate.day,
        value: rate.low,
      }));
      const high = rates.map((rate: Rate) => ({
        name: "high",
        day: rate.day,
        value: rate.high,
      }));

      const chartData = [...mean, ...low, ...high].filter(
        (chart: ChartDataItem) => selectedLine.includes(chart.name)
      );
      setDataChart(chartData);
    }
  }, [rates, selectedLine]);

  const onChangeSelection = useCallback(
    (name: string) => {
      const newSelectedLine = selectedLine.includes(name)
        ? selectedLine.filter((item) => item !== name)
        : [...selectedLine, name];
      setSelectedLine(newSelectedLine);
    },
    [selectedLine]
  );

  if (isLoadingPorts) return <h1>Loading...</h1>;

  return (
    <Container>
      <Select
        name="origin"
        value={input.origin}
        onChange={handleChange}
        disabledOption={input.destination}
        placeholder="Choose an origin"
        options={ports}
      />
      <button onClick={invertPorts}>Invert</button>
      <Select
        name="destination"
        value={input.destination}
        onChange={handleChange}
        disabledOption={input.origin}
        placeholder="Choose a destination"
        options={ports}
      />
      <Gradients />
      <div>
        <Grid gridTemplateColumns="300px 1fr" gap="20px">
          <MarketPositionList
            selectedLine={selectedLine}
            onChangeSelection={onChangeSelection}
          />
          <MultilineChart
            isLoading={isLoadingRates}
            isError={isErrorRates}
            data={dataChart}
            selectedLine={selectedLine}
          />
        </Grid>
      </div>
    </Container>
  );
}

export default App;
