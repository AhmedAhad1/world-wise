import React from "react";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";

const CountryList = ({ isLoading, data }) => {
  if (isLoading) return <Spinner />;
  if (!data.length) return <Message message={"Add a city"} />;

  const country = data.filter(
    (item, index) =>
      data.findIndex((el) => el.country === item.country) === index,
  );
  return (
    <ul className={styles.countryList}>
      {country.map((item) => (
        <CountryItem country={item} />
      ))}
    </ul>
  );
};

export default CountryList;
