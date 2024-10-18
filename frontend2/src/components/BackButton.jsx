import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function BackButton() {
    const navigate = useNavigate(); // Hook to access navigation functions

    return (
        <Button
            type="back" // Styling for the back button
            onClick={(event) => {
                event.preventDefault(); // Prevent default form submission or link behavior
                navigate(-1); // Navigate to the previous page in the browser history
            }}
        >
            Back
        </Button>
    );
}
