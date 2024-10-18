import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";
import { flagemojiToPNG } from "./Sidebar";
import styles from "./Map.module.css";
import { Button } from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

export function Map() {
    const { cities } = useCities(); // Get city data from context
    const [mapPosition, setMapPosition] = useState([40, 0]); // State to manage the current map position
    const [mapLat, mapLng] = useUrlPosition(); // Extract latitude and longitude from the URL
    const {
        isLoading: IsLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation(); // Custom hook for fetching the user's current geolocation

    // Update the map position if the URL contains lat/lng values
    useEffect(
        function () {
            if (mapLat && mapLng)
                setMapPosition([parseFloat(mapLat), parseFloat(mapLng)]);
        },
        [mapLat, mapLng]
    );

    // Update the map position to the user's geolocation when available
    useEffect(
        function () {
            if (geolocationPosition)
                setMapPosition([
                    geolocationPosition.lat,
                    geolocationPosition.lng,
                ]);
        },
        [geolocationPosition]
    );

    return (
        <div className={styles.mapContainer}>
            {/* Button to fetch and move to the user's current geolocation */}
            <Button type="position" onClick={getPosition}>
                {IsLoadingPosition ? "Loading..." : "Move to current position"}
            </Button>
            <MapContainer
                center={mapPosition} // Set initial center position of the map
                zoom={7} // Set zoom level
                scrollWheelZoom={true}
                className={styles.map}
            >
                {/* Map tile layer from an external source */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                />
                {/* Render markers for each city */}
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{flagemojiToPNG(city.emoji)}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                {/* Change the map center when the position changes */}
                <ChangeCenter position={mapPosition} />
                {/* Detect map clicks to navigate to the form with the clicked coordinates */}
                <DetectClick />
            </MapContainer>
        </div>
    );
}

// Component to change the map center when the position prop changes
function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position); // Update the map's center to the new position
    return null;
}

// Component to detect map clicks and navigate to the form page with clicked coordinates
function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (event) =>
            navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`), // Navigate to form page with lat/lng in the query params
    });
}
