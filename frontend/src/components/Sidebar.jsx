import { Outlet } from "react-router-dom"; // Import Outlet to render child routes
import { AppNav } from "./AppNav"; // Import AppNav component for navigation links
import { Logo } from "./Logo"; // Import Logo component for branding
import styles from "./Sidebar.module.css"; // Import CSS module for styling

// Function to convert a flag emoji to a PNG image using the flag's country code
export function flagemojiToPNG(flag) {
    if (!flag) return;

    // Convert emoji to a country code
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
        .map((char) => String.fromCharCode(char - 127397).toLowerCase())
        .join("");

    // Return an image element with the flag's PNG URL
    return (
        <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
}

// Function to format a date in "day month year" format
export function formatDate(date) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

// Sidebar component containing the logo, navigation, and outlet for child routes
export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            {/* Render Logo component */}
            <Logo />
            
            {/* Render navigation links */}
            <AppNav />
            
            {/* Render child routes inside Outlet */}
            <Outlet />
        </div>
    );
}
