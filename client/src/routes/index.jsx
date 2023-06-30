import {
    createBrowserRouter,
} from "react-router-dom";
import DataTable from "../components/datatable.jsx";
import DefaultLayout from "../layout/default-layout.jsx";
import DashboardPage from "../pages/dashboard-page.jsx";
import ErrorPage from "../pages/error-page.jsx";
import LoginPage from "../pages/login-page.jsx";
import RegisterPage from "../pages/register-page.jsx";

const router = createBrowserRouter([
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
    },
    {
        path: "/register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
]);

export default router;