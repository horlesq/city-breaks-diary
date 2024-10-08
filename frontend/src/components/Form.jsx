import { useEffect, useState } from "react";
import { Button } from "./Button";
import { BackButton } from "./BackButton";
import { Message } from "./Message";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { flagemojiToPNG, formatDate } from "./Sidebar";
import { Spinner } from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";

function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function hashStringToInt(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash); // Ensure positive integer
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function Form() {
    const { postCity, isLoading } = useCities();
    const navigate = useNavigate();
    const [lat, lng] = useUrlPosition();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date().toISOString());
    const [notes, setNotes] = useState("");
    const [emoji, setEmoji] = useState("");
    const [geocodingError, setGeocodingError] = useState("");
    const [postError, setPostError] = useState("");

    useEffect(
        function () {
            if (!lat && !lng) return;

            async function fetchCityData() {
                try {
                    setIsLoadingGeocoding(true);
                    setGeocodingError("");
                    setPostError("");

                    const res = await fetch(
                        `${BASE_URL}?latitude=${lat}&longitude=${lng}`
                    );
                    const data = await res.json();

                    if (!data.countryCode)
                        throw new Error(
                            "That is not a valid location. Click on a city!"
                        );

                    setCityName(data.city || data.locality || "");
                    setCountry(data.countryName);
                    setEmoji(convertToEmoji(data.countryCode));
                } catch (error) {
                    setGeocodingError(error.message);
                } finally {
                    setIsLoadingGeocoding(false);
                }
            }
            fetchCityData();
        },
        [lat, lng]
    );

    async function handleSubmit(event) {
        event.preventDefault();

        if (!cityName || !date) return;

        // Create a unique id by hashing cityName and date
        const id = hashStringToInt(`${cityName}-${date.split("T")[0]}`);

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat, lng },
            id,
        };
        try {
            setPostError("");
            await postCity(newCity);
            navigate("/app/cities");
        } catch (error) {
            setPostError(error.message);
        }
    }

    if (isLoadingGeocoding) return <Spinner />;

    if (geocodingError) return <Message message={geocodingError} />;

    if (postError) return <Message message={postError} />;

    if (!lat && !lng) return <Message message="Start by clicking on a city!" />;

    return (
        <form
            className={`${styles.form} ${isLoading ? styles.loading : ""}`}
            onSubmit={handleSubmit}
        >
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{flagemojiToPNG(emoji)}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker
                    id="date"
                    onChange={(date) => setDate(date.toISOString())}
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <BackButton />
                <Button type="primary">Add</Button>
            </div>
        </form>
    );
}
