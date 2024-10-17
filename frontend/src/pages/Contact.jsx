import { PageNav } from "../components/PageNav";
import styles from "./AboutContact.module.css";

export function Contact() {
    return (
        <main className={styles.aboutcontact}>
            <PageNav />
            <section>
                <div>
                    <h2>Contact me</h2>
                    <p>
                        If you have any questions or if you find any bugs, feel
                        free to reach out at:
                    </p>
                    <h3>
                        <strong>Email:</strong> adrian.horlescu@gmail.com
                    </h3>
                    <h3>
                        <strong>Linkedin:</strong>{" "}
                        linkedin.com/in/adrian-horlescu
                    </h3>
                    <h3>
                        <strong>Github:</strong> github.com/horlesq
                    </h3>
                </div>
            </section>
        </main>
    );
}
