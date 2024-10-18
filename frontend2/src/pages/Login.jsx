import { useEffect, useState } from "react";
import { PageNav } from "../components/PageNav";
import { Button } from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export function Login() {
    const navigate = useNavigate();
    const { login, register, isAuthentificated } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    function handleLoginRegister(event) {
        event.preventDefault();

        if (isRegistering && email && password && password === confirmPassword)
            register(email, password);

        if (!isRegistering && email && password) login(email, password);
    }

    useEffect(
        function () {
            if (isAuthentificated) navigate("/app", { replace: true });
        },
        [isAuthentificated, navigate]
    );

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
                    <Button
                        type="primary"
                        onClick={(event) => handleLoginRegister(event)}
                    >
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
