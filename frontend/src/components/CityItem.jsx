import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { flagemojiToPNG, formatDate } from "./Sidebar";
import { useCities } from "../contexts/CitiesContext";

export function CityItem({ city }) {
    const { currentCity } = useCities();
    const { cityName, emoji, date, id, position } = city;

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
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}
