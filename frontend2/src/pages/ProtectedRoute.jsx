import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export function ProtectedRoute({ children }) {
    const { isAuthentificated } = useAuth();
    const navigate = useNavigate();

    useEffect(
        function () {
            if (!isAuthentificated) navigate("/");
        },
        [isAuthentificated, navigate]
    );

    return isAuthentificated ? children : null;
}
