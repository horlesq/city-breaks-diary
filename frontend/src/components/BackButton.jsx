import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function BackButton() {
    const navigate = useNavigate();
    return (
        <Button
            type="back"
            onClick={(event) => {
                event.preventDefault();
                navigate(-1);
            }}
        >
            Back
        </Button>
    );
}
