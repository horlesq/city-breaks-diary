import { CountryItem } from "./CountryItem";
import { Message } from "./Message";
import { Spinner } from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import styles from "./CountryList.module.css";

export function CountryList() {
    const { cities, isLoading } = useCities();

    if (isLoading) return <Spinner />;

    if (!cities.length)
        return <Message message="Add a city break by pining it on the map" />;

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, []);

    return (
        <ul className={styles.countryList}>
            {[...countries].map((country) => (
                <CountryItem country={country} key={country.country} />
            ))}
        </ul>
    );
}
