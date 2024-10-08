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

    async function postCity(newCity) {
        try {
            setIsLoading(true);

            const res = await fetch(`${BASE_URL}/${user}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                const errMessage = await res.json();
                throw new Error(errMessage.detail || "Failed to add city");
            }

            setCities((cities) => [...cities, newCity]);
        } catch (error) {
            console.error(error.message);
            throw new Error(
                "City break for this date has already been added. Please select a different date or update the existing entry."
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true);

            const res = await fetch(`${BASE_URL}/${user}/cities/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const errMessage = await res.json();
                throw new Error(errMessage.detail || "Failed to delete city");
            }

            setCities((cities) => cities.filter((city) => city.id !== id));
        } catch (error) {
            throw new Error("Error deleting city!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                currentCity,
                getCity,
                postCity,
                deleteCity,
                isLoading,
            }}
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
