import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
const Map = () => {
  const [searchParams, setSearchparams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      Map
      <h1>lat: {lat}</h1>
      <h1>lng: {lng}</h1>
    </div>
  );
};

export default Map;
