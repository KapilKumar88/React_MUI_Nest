import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        isAuthenticated ? <Outlet /> : <Navigate to={"/unauthorized"} replace />
    );
}