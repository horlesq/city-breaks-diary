import styles from "./CityItem.module.css";
import { flagemojiToPNG } from "./Sidebar";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

export function CityItem({ city }) {
    const { cityName, emoji, date } = city;

    return (
        <li className={styles.cityItem}>
            <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn}>&times;</button>
        </li>
    );
}
