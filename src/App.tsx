import { useState } from "react";
import { useQuery } from "react-query";
import { fetchPorts } from "./services/ports";
import { fetchRates } from "./services/rates";

interface Port {
  code: string;
  name: string;
}

function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const { data: ports, isLoading: isLoadingPorts } = useQuery(
    "ports",
    fetchPorts,
    { refetchOnWindowFocus: false }
  );

  const { data: rates, isLoading: isLoadingRates } = useQuery(
    ["rates", origin, destination],
    () => fetchRates({ origin, destination }),
    {
      enabled: Boolean(origin && destination),
      refetchOnWindowFocus: false,
      staleTime: 5000,
      retry: false,
    }
  );

  const invertPorts = () => {
    const _origin = origin;
    setOrigin(destination);
    setDestination(_origin);
  };

  if (isLoadingPorts) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <select value={origin} onChange={(e: any) => setOrigin(e.target.value)}>
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
        value={destination}
        onChange={(e: any) => setDestination(e.target.value)}
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

      <div>
        <h1>Origin: {origin}</h1>
        <h1>Destination: {destination}</h1>
      </div>
    </div>
  );
}

export default App;
