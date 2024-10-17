import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";

const BASE_URL = "http://localhost:8000/trips";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    currentCity: {},
    isLoading: false,
    error: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };

        case "cities/loaded":
            return { ...state, isLoading: false, cities: action.payload };

        case "city/loaded":
            return { ...state, isLoading: false, currentCity: action.payload };

        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };

        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
                currentCity: {},
            };

        case "rejected":
            return { ...state, isLoading: false, error: action.payload };

        default:
            throw new Error("Unknown action type");
    }
}

function CitiesProvider({ children }) {
    const { user } = useAuth();
    const userName = user !== null ? user.email : null;
    const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(
        function () {
            async function fetchCities() {
                try {
                    dispatch({ type: "loading" });

                    const res = await fetch(`${BASE_URL}/${userName}/cities`);
                    const data = await res.json();

                    dispatch({ type: "cities/loaded", payload: data });
                } catch (error) {
                    dispatch({
                        type: "rejected",
                        payload: "There was an error fetching data...",
                    });
                }
            }

            if (userName) fetchCities();
        },
        [userName]
    );

    async function getCity(id) {
        try {
            dispatch({ type: "loading" });

            const res = await fetch(`${BASE_URL}/${userName}/cities/${id}`);
            const data = await res.json();

            dispatch({ type: "city/loaded", payload: data });
        } catch (error) {
            dispatch({
                type: "rejected",
                payload: "There was an error fetching data...",
            });
        }
    }

    async function postCity(newCity) {
        try {
            dispatch({ type: "loading" });

            const res = await fetch(`${BASE_URL}/${userName}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                const errMessage = await res.json();
                throw new Error(errMessage.detail || "Failed to add city");
            }

            dispatch({ type: "city/created", payload: newCity });
        } catch (error) {
            dispatch({
                type: "rejected",
                payload: "There was an error posting data...",
            });

            throw new Error(
                "City break for this date has already been added. Please select a different date or update the existing entry."
            );
        }
    }

    async function deleteCity(id) {
        try {
            dispatch({ type: "loading" });

            const res = await fetch(`${BASE_URL}/${userName}/cities/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const errMessage = await res.json();
                throw new Error(errMessage.detail || "Failed to delete city");
            }

            dispatch({ type: "city/deleted", payload: id });
        } catch (error) {
            dispatch({
                type: "rejected",
                payload: "There was an error deleting data...",
            });

            throw new Error("Error deleting city!");
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
