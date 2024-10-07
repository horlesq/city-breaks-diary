import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Product } from "./pages/Product";
import { Pricing } from "./pages/Pricing";
import { PageNotFound } from "./pages/PageNotFound";
import { Homepage } from "./pages/Homepage";
import { AppLayout } from "./pages/AppLayout.jsx";
import { Login } from "./pages/Login.jsx";
import { CityList } from "./components/CityList.jsx";
import { CountryList } from "./components/CountryList.jsx";
import { City } from "./components/City.jsx";
import { Form } from "./components/Form.jsx";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";

export function App() {
    return (
        <CitiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="product" element={<Product />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="login" element={<Login />} />
                    <Route path="app" element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate replace to="cities" />}
                        />
                        <Route path="cities" element={<CityList />} />
                        <Route path="cities/:id" element={<City />} />
                        <Route path="countries" element={<CountryList />} />
                        <Route path="form" element={<Form />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CitiesProvider>
    );
}
