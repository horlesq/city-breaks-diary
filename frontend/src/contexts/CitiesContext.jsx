import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000/trips";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [user, setUser] = useState("test");
    const [cities, setCities] = useState([]);
    const [currentCity, setCurrentCity] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/${user}/cities`);
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

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/${user}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch (error) {
            alert("There was an error fetching data...");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{ cities, currentCity, getCity, isLoading }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("CitiesContext was used outside the CitiesProvied");
    return context;
}

export { CitiesProvider, useCities };
