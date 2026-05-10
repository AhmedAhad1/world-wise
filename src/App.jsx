import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";

import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import CitiesContextProvider from "./contexts/CitiesContext";

const App = () => {
  return (
    <CitiesContextProvider>
      <div>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Homepage />} /> */}

            <Route index element={<Homepage />} />
            <Route path="app" element={<AppLayout />}>
              {/* when u write index u dont write path */}
              {/* Navigate component used to redirect u from the route. so if u go to app it wiil redirect u to /app/cities */}
              <Route index element={<Navigate replace to={"cities"} />} />
              <Route path="cities" element={<CityList />} />

              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CitiesContextProvider>
  );
};

export default App;
