import { useNavigate, useSearchParams } from "react-router-dom";
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

export function Map() {
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        isLoading: IsLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();

    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    useEffect(
        function () {
            if (mapLat && mapLng)
                setMapPosition([parseFloat(mapLat), parseFloat(mapLng)]);
        },
        [mapLat, mapLng]
    );

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
            <Button type="position" onClick={getPosition}>
                {IsLoadingPosition ? "Loading..." : "Move to current position"}
            </Button>
            <MapContainer
                center={mapPosition}
                zoom={7}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                />
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
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (event) =>
            navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`),
    });
}
