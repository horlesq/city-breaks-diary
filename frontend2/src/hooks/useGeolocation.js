import { useState } from "react";

// Custom hook to get the user's current geolocation
export function useGeolocation(defaultPosition = null) {
    // State to track loading status
    const [isLoading, setIsLoading] = useState(false);
    
    // State to store the user's position (latitude and longitude)
    const [position, setPosition] = useState(defaultPosition);
    
    // State to store any error messages related to geolocation
    const [error, setError] = useState(null);

    // Function to get the current position using the browser's Geolocation API
    function getPosition() {
        // Check if the browser supports geolocation
        if (!navigator.geolocation)
            return setError("Your browser does not support geolocation");

        // Start loading and request the position
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                // On success, update position with latitude and longitude
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setIsLoading(false); // Stop loading
            },
            (error) => {
                // On error, set the error message and stop loading
                setError(error.message);
                setIsLoading(false);
            }
        );
    }

    // Return the current state and the function to get the user's position
    return { isLoading, position, error, getPosition };
}
