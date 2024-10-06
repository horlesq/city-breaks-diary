import { Outlet } from "react-router-dom";
import { AppNav } from "./AppNav";
import { Logo } from "./Logo";
import styles from "./Sidebar.module.css";

export function flagemojiToPNG(flag) {
    if (!flag)  return;
    
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
        .map((char) => String.fromCharCode(char - 127397).toLowerCase())
        .join("");
    return (
        <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
}

export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />

            <Outlet />
        </div>
    );
}
