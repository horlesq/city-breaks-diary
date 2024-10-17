import { createContext, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:8000/user";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthentificated: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload, isAuthentificated: true };
        case "logout":
            return { ...state, user: null, isAuthentificated: false };
        default:
            throw new Error("Unknown action type");
    }
}

function AuthProvider({ children }) {
    const [{ user, isAuthentificated }, dispatch] = useReducer(
        reducer,
        initialState
    );

    // Login function
    async function login(email, password) {
        try {
            const res = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error("Login failed");

            const data = await res.json();

            // Dispatch the login action to set the user state
            dispatch({ type: "login", payload: data });
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    // Register function
    async function register(email, password) {
        try {
            const res = await fetch(`${BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) throw new Error("Registration failed");
            const data = await res.json();

            // Dispatch register action after registration
            dispatch({ type: "login", payload: data });
        } catch (error) {
            console.error("Registration error:", error);
        }
    }

    function logout() {
        dispatch({ type: "logout" });
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthentificated, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext was used outside the AuthProvied");
    return context;
}

export { AuthProvider, useAuth };
