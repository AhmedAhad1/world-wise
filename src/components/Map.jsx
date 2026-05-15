import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import { useGeolocation } from "../custom-hooks/useGeolocation";
import Button from "../components/Button";
const Map = () => {
  const [searchParams, setSearchparams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isGeolocationLoading,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const { data: cities } = useCities();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isGeolocationLoading ? "Loading..." : "Get Position"}
      </Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((item) => (
          <Marker
            position={[item.position.lat, item.position.lng]}
            key={item.id}
          >
            <Popup>{item.notes}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
