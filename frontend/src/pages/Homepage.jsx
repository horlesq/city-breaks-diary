import { Link } from "react-router-dom";
import { PageNav } from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
    return (
        <main className={styles.homepage}>
            <PageNav />
            <section>
                <h1>
                    Discover the world.
                    <br />
                    City Breaks Diary marks your adventures.
                </h1>
                <h2>
                    Pin every city you&apos;ve explored on a personalized map.
                    Keep track of your travels and revisit your memorable
                    adventures as you chart your journey across the globe.
                </h2>
                <Link to="/login" className="cta">
                    Start tracking now
                </Link>
            </section>
        </main>
    );
}
