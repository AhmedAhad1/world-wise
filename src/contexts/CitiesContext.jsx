import { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const BASE_URL = `http://localhost:3000`;

const CitiesContext = createContext();

const CitiesContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsloading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsloading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCurrentCity(id) {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  }

  async function createCity(city) {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newCity = await res.json();
      setData([...data, newCity]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ data, isLoading, currentCity, getCurrentCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) throw new Error("Error getting context");

  return context;
}

export { CitiesContextProvider, useCities };
