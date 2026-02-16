import { useState, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useStations } from "./hooks/useStations";
import MapView from "./components/MapView";
import "./App.css";

const queryClient = new QueryClient();

function AppContent() {
  // Fetch stations using the custom hook
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: stations = [], isLoading, isError } = useStations();
  const [city, setCity] = useState("");
  const [selectedStation, setSelectedStation] = useState(null);
  const filteredStations = useMemo(() => {
    return stations.filter((station) =>
      station.city.toLowerCase().includes(city.toLowerCase()),
    );
  }, [stations, city]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );

  console.log({ stations, isLoading, isError });
  const isEmptyError = isSubmitted && city.trim() === "";
  const isNoResultError =
    isSubmitted && city.trim() !== "" && filteredStations.length === 0;

  return (
    <div className="min-h-screen p-6 md:p-10 transition-colors duration-500 bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
        German Train Stations
      </h1>
      <input
        type="text"
        placeholder="Filter by city..."
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setIsSubmitted(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsSubmitted(true);
          }
        }}
        className="w-full md:w-72 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />
      {(isEmptyError || isNoResultError) && (
        <div className="w-full md:w-72 mx-auto text-center p-2 bg-red-100 border border-red-400 text-red-600 rounded mb-4 text-sm">
          {isEmptyError
            ? "Please enter a city name."
            : "No stations found for this city."}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4 gap-6 mt-6">
        <ul className="col-span-1 md:col-span-2 lg:col-span-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-xl dark:shadow-black/40 rounded-2xl p-4 overflow-y-auto max-h-[35vh] md:max-h-[70vh] transition-colors duration-500">
          {filteredStations.map((station) => (
            <li
              key={station.id}
              onClick={() => setSelectedStation(station)}
              className={`text-sm sm:text-base md:text-lg cursor-pointer p-3 rounded-xl transition-all duration-300 ${
                selectedStation?.id === station.id
                  ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-[1.02]"
                  : "hover:bg-indigo-50 dark:hover:bg-slate-700"
              }`}
            >
              <strong className="block">{station.name}</strong>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {station.city}
              </span>
            </li>
          ))}
        </ul>

        <div className="col-span-1 md:col-span-3 lg:col-span-3 h-[50vh] md:h-[70vh] rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/50 transition-all duration-500">
          <MapView
            stations={filteredStations}
            selectedStation={selectedStation}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
