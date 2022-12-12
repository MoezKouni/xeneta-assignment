import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { fetchPorts } from "./services/ports";
import { fetchRates } from "./services/rates";
import MultilineChart from "./components/MultilineChart";
import Container from "./components/Container";
import Gradients from "./components/Gradients";

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
  const [dataChart, setDataChart] = useState<Array<ChartDataItem>>([]);

  const { data: ports, isLoading: isLoadingPorts } = useQuery(
    "ports",
    fetchPorts,
    { refetchOnWindowFocus: false, retry: false }
  );

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

  const onChangeSelection = useCallback((name: string) => {
    const newSelectedLine = selectedLine.includes(name)
      ? selectedLine.filter((item) => item !== name)
      : [...selectedLine, name];
    setSelectedLine(newSelectedLine);
  }, [selectedLine]);

  if (isLoadingPorts) return <h1>Loading...</h1>;

  return (
    <Container>
      <select value={input.origin} name="origin" onChange={handleChange}>
        <option value="" disabled>
          Choose Tagging
        </option>
        {ports.map((port: Port) => (
          <option key={port.code} value={port.code}>
            {port.name}
          </option>
        ))}
      </select>
      <button onClick={invertPorts}>Invert</button>
      <select
        value={input.destination}
        name="destination"
        onChange={handleChange}
      >
        <option value="" disabled>
          Choose Tagging
        </option>
        {ports.map((port: Port) => (
          <option key={port.code} value={port.code}>
            {port.name}
          </option>
        ))}
      </select>
      <Gradients />
      <div>
        <h1>Origin: {input.origin}</h1>
        <h1>Destination: {input.destination}</h1>
        {["low", "mean", "high"].map((line: string) => (
          <div className="checkbox" key={line}>
            {line !== "Portfolio" && (
              <input
                type="checkbox"
                value={line}
                id={line}
                checked={selectedLine.includes(line)}
                onChange={() => onChangeSelection(line)}
              />
            )}
            <label htmlFor={line}>{line}</label>
          </div>
        ))}
        <MultilineChart
          isLoading={isLoadingRates}
          isError={isErrorRates}
          data={dataChart}
          selectedLine={selectedLine}
        />
      </div>
    </Container>
  );
}

export default App;
