import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Product } from "./pages/Product";
import { Pricing } from "./pages/Pricing";
import { PageNotFound } from "./pages/PageNotFound";
import { Homepage } from "./pages/Homepage";
import { AppLayout } from "./pages/AppLayout.jsx";
import { Login } from "./pages/Login.jsx";
import { CityList } from "./components/CityList.jsx";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000/trips/test";

export function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (error) {
                alert("There was an error fetching data...");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);
    console.log(cities);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="app" element={<AppLayout />}>
                    <Route
                        index
                        element={
                            <CityList cities={cities} isLoading={isLoading} />
                        }
                    />
                    <Route
                        path="cities"
                        element={
                            <CityList cities={cities} isLoading={isLoading} />
                        }
                    />
                    <Route path="countries" element={<p>countires</p>} />
                    <Route path="form" element={<p>form</p>} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
