import styles from "./Message.module.css";

export function Message({ message }) {
    return <p className={styles.message}>{message}</p>;
}
