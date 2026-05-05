import { useEffect } from "react";
import { useState } from "react";

export function useCityFetch(url) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsloading(true);
        const res = await fetch(url);
        const data = await res.json();
        setCities(data);
      } catch {
        throw new Error("something is wrong");
      } finally {
        setIsloading(false);
      }
    }
    fetchCities();
  }, [url, setIsloading]);

  return [cities, isLoading];
}
