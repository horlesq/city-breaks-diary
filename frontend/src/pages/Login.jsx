import { useState } from "react";
import { PageNav } from "../components/PageNav";
import { Button } from "../components/Button";
import styles from "./Login.module.css";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and register forms

    return (
        <main className={styles.login}>
            <PageNav />
            <form className={styles.form}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        value={password}
                    />
                </div>

                {isRegistering && (
                    <div className={styles.row}>
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            value={confirmPassword}
                        />
                    </div>
                )}

                <div className={styles.buttons}>
                    <Button type="primary">
                        {isRegistering ? "Register" : "Login"}
                    </Button>
                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            setIsRegistering(!isRegistering);
                        }}
                        className={styles.toggle}
                    >
                        {isRegistering
                            ? "Already have an account? Login"
                            : "Don't have an account? Register"}
                    </button>
                </div>
            </form>
        </main>
    );
}
