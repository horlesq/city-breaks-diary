import { CityItem } from "./CityItem";
import { Message } from "./Message";
import { Spinner } from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import styles from "./CityList.module.css";

export function CityList() {
    const { cities, isLoading } = useCities();

    if (isLoading) return <Spinner />;

    if (!cities.length)
        return <Message message="Add a city break by pining it on the map" />;

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => (
                <CityItem city={city} key={city.id} />
            ))}
        </ul>
    );
}
