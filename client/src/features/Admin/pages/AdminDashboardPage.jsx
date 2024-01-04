import styles from "../styles/AdminDashboard.module.css";
import AdminNavigation from "../components/AdminNavigation.jsx";
import { Outlet } from "react-router-dom";

export default function AdminDashboardPage() {
    return (
        <div className={styles.adminDashboard}>
            <AdminNavigation />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}