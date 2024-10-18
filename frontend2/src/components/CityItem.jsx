import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { flagemojiToPNG, formatDate } from "./Sidebar";
import { useCities } from "../contexts/CitiesContext";

export function CityItem({ city }) {
    const { currentCity, deleteCity } = useCities();
    const { cityName, emoji, date, id, position } = city;

    function handleDelete(event) {
        event.preventDefault();
        deleteCity(id);
    }

    return (
        <li>
            <Link
                className={`${styles.cityItem} ${
                    id === currentCity.id ? styles[`cityItem--active`] : ""
                }`}
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
            >
                <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={handleDelete}>
                    &times;
                </button>
            </Link>
        </li>
    );
}
