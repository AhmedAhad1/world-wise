import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
const CityList = () => {
  const { data, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!data.length) return <Message message={"Add a city"} />;
  return (
    <ul className={styles.cityList}>
      {data.map((item) => (
        <CityItem city={item} key={item.id} />
      ))}
    </ul>
  );
};

export default CityList;
