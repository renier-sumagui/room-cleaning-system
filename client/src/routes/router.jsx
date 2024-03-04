import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "pages/NotFound.jsx";
import LoginPage from "pages/Login/LoginPage.jsx";
import AdminDashboardPage from "features/Admin/pages/AdminDashboardPage";
import AdminEmployeesDashboard from "features/Admin/components/AdminEmployeesDashboard";
import CreateEmployeeForm from "features/Admin/components/CreateEmployeeForm";
import AdminRoomsDashboard from "features/Admin/components/AdminRoomsDashboard";
import CreateRoomForm from "features/Admin/components/CreateRoomForm";
import ExmployeeDashboardPage from "features/Employee/pages/EmployeeDashboardPage";
import EmployeeRoom from "features/Employee/components/EmployeeRoom";
import AssignedRoomsTable from "features/Employee/components/AssignedRoomsTable";
import Room from "features/Admin/components/Room";
import AdminStudentsDashboard from "features/Admin/components/AdminStudentsDashboard";
import CreateStudentForm from "features/Admin/components/CreateStudentForm";
import Home from "features/Employee/components/Home";
import AssignedStudentsTable from "features/Employee/components/AssignedStudentsTable";

const errorElement = <NotFound />

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
        errorElement
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement
    },
    {
        path: "/admin",
        element: <AdminDashboardPage />,
        errorElement: <NotFound />,
        children: [
            {
                path: "employees",
                element: <AdminEmployeesDashboard />,
                errorElement
            },
            {
                path: "rooms",
                element: <AdminRoomsDashboard />,
                errorElement
            },
            {
                path: "students",
                element: <AdminStudentsDashboard />,
                errorElement
            },
            {
                path: "students/create",
                element: <CreateStudentForm />,
                errorElement
            },
            {
                path: "employees/create",
                element: <CreateEmployeeForm />,
                errorElement
            },
            {
                path: "rooms/create",
                element: <CreateRoomForm />,
                errorElement
            },
            {
                path: "rooms/:roomName",
                element: <Room />,
                errorElement
            }
        ]
    },
    {
        path: "/employee",
        element: <ExmployeeDashboardPage />,
        errorElement,
        children: [
            {
                path: "home",
                element: <Home />,
                errorElement
            },
            {
                path: "assigned-rooms",
                element: <AssignedRoomsTable />,
                errorElement
            },
            {
                path: "assigned-students",
                element: <AssignedStudentsTable />,
                errorElement
            },
            {
                path: "assigned-rooms/:roomName",
                element: <EmployeeRoom />,
                errorElement
            }
        ]
    },

]);

export default router;