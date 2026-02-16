import { useQuery } from "@tanstack/react-query";
import { fetchStations } from "../api/stations";

export const useStations = () => {
  return useQuery({
    queryKey: ["stations"],
    queryFn: fetchStations,
    staleTime: 1000 * 60 * 5, 
    retry: 1, 
  });
};
