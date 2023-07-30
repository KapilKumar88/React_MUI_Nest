import {
    createBrowserRouter,
} from "react-router-dom";
import AuthGuard from "../guard/auth-guard.jsx";
import AuthLayout from "../layout/auth-layout.jsx";
import DefaultLayout from "../layout/default-layout.jsx";
import DashboardPage from "../pages/dashboard-page.jsx";
import ErrorPage from "../pages/error-page.jsx";
import ForgotPasswordPage from "../pages/auth/forgot-password-page.jsx";
import LoginPage from "../pages/auth/login-page.jsx";
import RegisterPage from "../pages/auth/register-page.jsx";
import ResetPasswordPage from "../pages/auth/reset-password-page.jsx";
import UnauthorizedPage from "../pages/unauthorized-page.jsx";
import TaskPage from "../pages/task/task-page.jsx";
import AddTaskPage from "../pages/task/add-task-page.jsx";
import EditTaskPage from "../pages/task/edit-task-page.jsx";

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
                        path: 'task',
                        element: <TaskPage />
                    },
                    {
                        path: 'add-task',
                        element: <AddTaskPage />
                    },
                    {
                        path: 'edit-task',
                        element: <EditTaskPage />
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