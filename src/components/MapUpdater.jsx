import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapUpdater({ station }) {
  const map = useMap();

  useEffect(() => {
    if (station) {
      map.flyTo([station.lat, station.lng], 10);
    }
  }, [station, map]);

  return null;
}
