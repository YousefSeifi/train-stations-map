import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapUpdater from "./MapUpdater";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icon issue with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView({ stations, selectedStation }) {
  return (
    <MapContainer
      center={[51.1657, 10.4515]}
      zoom={6}
      className="w-full h-125 rounded-lg shadow-md"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lng]}
        >
          <Popup className="text-sm">
            <strong>{station.name}</strong>
            <br />
            {station.city}
          </Popup>
        </Marker>
      ))}

      <MapUpdater station={selectedStation} />
      
    </MapContainer>
  );
}

