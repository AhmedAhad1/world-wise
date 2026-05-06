import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect } from "react";
import { useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = `http://localhost:3000`;

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

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

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}

          <Route index element={<Homepage />} />
          <Route path="app" element={<AppLayout />}>
            {/* when u write index u dont write path */}
            <Route
              index
              element={<CityList data={data} isLoading={isLoading} />}
            />
            <Route
              path="cities"
              element={<CityList data={data} isLoading={isLoading} />}
            />

            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<CountryList data={data} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
