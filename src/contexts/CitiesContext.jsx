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

  return (
    <CitiesContext.Provider
      value={{ data, isLoading, currentCity, getCurrentCity }}
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
