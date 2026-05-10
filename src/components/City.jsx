import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import { useLayoutEffect } from "react";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { currentCity, getCurrentCity, isLoading } = useCities();

  const { cityName, emoji, date, notes } = currentCity;

  const { id } = useParams();
  const [searchParams, setSearchparams] = useSearchParams();

  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  useLayoutEffect(() => {
    getCurrentCity(id);
  }, [id]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>

    // <>
    //   <h1>City {id}</h1>
    //   <h3>
    //     lat: {lat}, lng:{lng}
    //   </h3>

    //   <button
    //     onClick={() => {
    //       const copySearchparams = searchParams;
    //       setSearchparams({
    //         lat: copySearchparams.get("lat"),
    //         lng: "changgeddde",
    //       });
    //     }}
    //   >
    //     change
    //   </button>
    // </>
  );
}

export default City;
