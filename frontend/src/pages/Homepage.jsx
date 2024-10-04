import { Link } from "react-router-dom";
import { PageNav } from "../components/PageNav";
import styles from "./Homepage.module.css";

export function Homepage() {
    return (
        <main className={styles.homepage}>
            <PageNav />
            <section>
                <h1>
                    Discover the world.
                    <br />
                    Map My Trip marks your adventures.
                </h1>
                <h2>
                    Pin every city or destination you&apos;ve explored on a
                    personalized map. Keep track of your travels and revisit
                    your memorable adventures as you chart your journey across
                    the globe.
                </h2>
                <Link to="/app" className="cta">
                    Start tracking now
                </Link>
            </section>
        </main>
    );
}
