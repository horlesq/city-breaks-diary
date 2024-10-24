import { useParams, useSearchParams } from "react-router-dom";
import { flagemojiToPNG, formatDate } from "./Sidebar";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import { Spinner } from "./Spinner";
import { BackButton } from "./BackButton";
import styles from "./City.module.css";

export function City() {
    const { id } = useParams(); // Get the city ID from the URL params
    const { currentCity, getCity, isLoading } = useCities(); // Extract city details from context
    const { cityName, emoji, date, notes } = currentCity || {}; // Destructure currentCity object

    useEffect(
        function () {
            getCity(id); // Fetch the city details when the component mounts or city ID changes
        },
        [id, getCity] // Dependency array to refetch city data if the ID changes
    );

    if (isLoading) return <Spinner />; // Show a loading spinner while data is being fetched

    return (
        <div className={styles.city}>
            {/* Display the city name and emoji */}
            <div className={styles.row}>
                <h6>City name</h6>
                <h3>
                    <span>{flagemojiToPNG(emoji)}</span> {cityName}
                </h3>
            </div>

            {/* Display the date of the visit */}
            <div className={styles.row}>
                <h6>You went to {cityName} on</h6>
                <p>{formatDate(date || null)}</p>
            </div>

            {/* Display notes if available */}
            {notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{notes}</p>
                </div>
            )}

            {/* Link to the city's Wikipedia page */}
            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${cityName}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Check out {cityName} on Wikipedia &rarr;
                </a>
            </div>

            {/* Back button to navigate to the previous page */}
            <div>
                <BackButton />
            </div>
        </div>
    );
}
