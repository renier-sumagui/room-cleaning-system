import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AdminDashboard.module.css";
import AdminNavigation from "../components/AdminNavigation.jsx";


export default function AdminDashboardPage() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        if (user !== null && !user.is_admin) {
            navigate("/employee");
        } 
        if (user === null) {
            navigate("/login");
        }
    }, [])

    return (
        <div className={styles.adminDashboard}>
            <AdminNavigation />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}