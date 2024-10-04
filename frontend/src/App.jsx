import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Product } from "./pages/Product";
import { Pricing } from "./pages/Pricing";
import { PageNotFound } from "./pages/PageNotFound";
import { Homepage } from "./pages/Homepage";
import { AppLayout } from "./pages/AppLayout.jsx";
import { Login } from "./pages/Login.jsx";
import { CityList } from "./components/CityList.jsx";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="app" element={<AppLayout />}>
                    <Route index element={<CityList />} />
                    <Route path="cities" element={<CityList />} />
                    <Route path="countries" element={<p>countires</p>} />
                    <Route path="form" element={<p>form</p>} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
