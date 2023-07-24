import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    return (
        isAuthenticated ? <Outlet /> : <Navigate to={"/unauthorized"} replace />
    );
}