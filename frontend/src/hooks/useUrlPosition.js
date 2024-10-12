import { useSearchParams } from "react-router-dom";

// Custom hook to extract latitude and longitude from the URL's query parameters
export function useUrlPosition() {
    // Get the search parameters from the URL
    const [searchParams] = useSearchParams();
    
    // Extract the "lat" and "lng" parameters from the URL
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    // Return the latitude and longitude as an array
    return [lat, lng];
}
