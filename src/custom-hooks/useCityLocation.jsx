import React from "react";
import { useSearchParams } from "react-router-dom";

const useCityLocation = () => {
  const [searchParams, setSearchparams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
};

export default useCityLocation;
