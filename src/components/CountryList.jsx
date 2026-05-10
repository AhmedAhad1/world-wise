import React from "react";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

const CountryList = () => {
  const { data, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!data.length) return <Message message={"Add a city"} />;

  const country = data.filter(
    (item, index) =>
      data.findIndex((el) => el.country === item.country) === index,
  );
  return (
    <ul className={styles.countryList}>
      {country.map((item) => (
        <CountryItem country={item} key={item.id} />
      ))}
    </ul>
  );
};

export default CountryList;
