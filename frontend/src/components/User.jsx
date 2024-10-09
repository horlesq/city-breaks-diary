import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

// "email": "testuser@example.com",
//   "password": "testpassword123"

export function User() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleClick() {
        logout();
        navigate("/");
    }

    return (
        <div className={styles.user}>
            <span>Welcome, {user.email.split("@")[0]}</span>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
}
