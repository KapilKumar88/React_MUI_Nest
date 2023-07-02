import {
    createBrowserRouter,
} from "react-router-dom";
import DataTable from "../components/datatable.jsx";
import AuthGuard from "../guard/auth-guard.jsx";
import AuthLayout from "../layout/auth-layout.jsx";
import DefaultLayout from "../layout/default-layout.jsx";
import DashboardPage from "../pages/dashboard-page.jsx";
import ErrorPage from "../pages/error-page.jsx";
import ForgotPasswordPage from "../pages/forgot-password-page.jsx";
import LoginPage from "../pages/login-page.jsx";
import RegisterPage from "../pages/register-page.jsx";
import ResetPasswordPage from "../pages/reset-password-page.jsx";
import UnauthorizedPage from "../pages/unauthorized-page.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthGuard />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <DefaultLayout />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: 'dashboard',
                        element: <DashboardPage />
                    },
                    {
                        path: 'datatable',
                        element: <DataTable />
                    }
                ]
            }
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/reset-password",
                element: <ResetPasswordPage />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPasswordPage />,
            },
        ]
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
    }
]);

export default router;