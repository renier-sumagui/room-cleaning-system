import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/EmployeeDashboardPage.module.css";
import { Outlet } from "react-router-dom";
import DangerBtnSolid from "components/Button/DangerBtnSolid";

export default function ExmployeeDashboardPage() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);

    
    useEffect(() => {
        if (user === null) {
            navigate("/login")
        } else if (user.is_admin) {
            navigate("/admin");
        }
    }, []);

    function logout() {
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <div className={ styles.employeeDashboardPage }>
            <div className={`${styles.logoutBtn}`}>
                <DangerBtnSolid type="button" onClick={logout}>Logout</DangerBtnSolid>
            </div>
            <Outlet />
        </div>
    )
}