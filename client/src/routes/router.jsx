import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "pages/NotFOund.jsx";
import LoginPage from "pages/Login/LoginPage.jsx";
import AdminDashboardPage from "features/Admin/pages/AdminDashboardPage";
import AdminEmployeesDashboard from "features/Admin/components/AdminEmployeesDashboard";
import CreateEmployeeForm from "features/Admin/components/CreateEmployeeForm";
import AdminRoomsDashboard from "features/Admin/components/AdminRoomsDashboard";
import CreateRoomForm from "features/Admin/components/CreateRoomForm";
import ExmployeeDashboardPage from "features/Employee/pages/EmployeeDashboardPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
        errorElement: <NotFound />
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <NotFound />
    },
    {
        path: "/admin",
        element: <AdminDashboardPage />,
        errorElement: <NotFound />,
        children: [
            {
                path: "employees",
                element: <AdminEmployeesDashboard />,
                errorElement: <NotFound />
            },
            {
                path: "rooms",
                element: <AdminRoomsDashboard />,
                errorElement: <NotFound />
            },
            {
                path: "employees/create",
                element: <CreateEmployeeForm />,
                errorElement: <NotFound />
            },
            {
                path: "rooms/create",
                element: <CreateRoomForm />,
                errorElement: <NotFound />
            }
        ]
    },
    {
        path: "employee",
        element: <ExmployeeDashboardPage />,
        errorElement: <NotFound />
    }
]);

export default router;