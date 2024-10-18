import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://city-breaks-diary-410d6e129886.herokuapp.com/user";

const AuthContext = createContext();

// Function to get initial user state from localStorage
function getInitialUserState() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

const initialState = {
    user: getInitialUserState(), // Get user info from localStorage
    isAuthenticated: !!getInitialUserState(), // Boolean to check if user exists
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

    useEffect(function () {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            dispatch({ type: "login", payload: JSON.parse(storedUser) });
        } else {
            dispatch({ type: "logout" });
        }
    }, []);

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

            // Store user info in localStorage
            localStorage.setItem("user", JSON.stringify(data));

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

            // Store user info in localStorage after registration
            localStorage.setItem("user", JSON.stringify(data));

            // Dispatch register action after registration
            dispatch({ type: "login", payload: data });
        } catch (error) {
            console.error("Registration error:", error);
        }
    }

    function logout() {
        localStorage.removeItem("user"); // Clear user info from localStorage
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
