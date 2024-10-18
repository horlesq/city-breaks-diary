import { PageNav } from "../components/PageNav";
import styles from "./AboutContact.module.css";

export function About() {
    return (
        <main className={styles.aboutcontact}>
            <PageNav />
            <section>
                <div>
                    <h2>About the App</h2>
                    <p>
                        The City Breaks Diary app is designed to help users
                        document and share their travel experiences. With a
                        user-friendly interface, the app enables users to pin
                        their adventures on a map and keep track of their
                        favorite destinations. It utilizes modern technologies
                        to provide a seamless and engaging experience:
                    </p>
                    <h3>The frontend is built with React</h3>
                    <h3>The backend is powered by FastAPI</h3>
                    <h3>User data is stored in MongoDB</h3>
                </div>
            </section>
        </main>
    );
}
