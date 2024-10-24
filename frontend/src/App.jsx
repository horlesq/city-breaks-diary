import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CityList } from "./components/CityList.jsx";
import { CountryList } from "./components/CountryList.jsx";
import { City } from "./components/City.jsx";
import { Form } from "./components/Form.jsx";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { ProtectedRoute } from "./pages/ProtectedRoute.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { SpinnerFullPage } from "./components/SpinnerFullPage.jsx";

// import { Contact } from "./pages/Contact.jsx";
// import { About } from "./pages/About";
// import { PageNotFound } from "./pages/PageNotFound";
// import { Homepage } from "./pages/Homepage";
// import { AppLayout } from "./pages/AppLayout.jsx";
// import { Login } from "./pages/Login.jsx";

const Homepage = lazy(() => import("./pages/Homepage"));
const About = lazy(() => import("./pages/About"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Contact = lazy(() => import("./pages/Contact"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

export function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage />}>
                        <Routes>
                            <Route index element={<Homepage />} />
                            <Route path="*" element={<PageNotFound />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="about" element={<About />} />
                            <Route path="login" element={<Login />} />
                            <Route
                                path="app"
                                element={
                                    <ProtectedRoute>
                                        <AppLayout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route
                                    index
                                    element={<Navigate replace to="cities" />}
                                />
                                <Route path="cities" element={<CityList />} />
                                <Route path="cities/:id" element={<City />} />
                                <Route
                                    path="countries"
                                    element={<CountryList />}
                                />
                                <Route path="form" element={<Form />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}
