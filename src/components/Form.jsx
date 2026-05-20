// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useEffect } from "react";
import useCityLocation from "../custom-hooks/useCityLocation";
import Message from "./Message";
import Spinner from "./Spinner";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [isCityNameLoading, setIsCityNameLoading] = useState(false);

  const [lat, lng] = useCityLocation();

  const [error, setError] = useState("");

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityName() {
      try {
        setIsCityNameLoading(true);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
        );

        const data = await res.json();
        if (!data.countryCode)
          throw new Error("Please Select a city. This is not a city");

        setCityName(data.city || data.locality || "");
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsCityNameLoading(false);
      }
    }

    fetchCityName();
  }, [lat, lng]);

  if (isCityNameLoading) return <Spinner />;
  if (!lat && !lng) return <Message message={"start by clicking on the map"} />;
  if (error) return <Message message={error} />;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
