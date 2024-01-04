import { useEffect, useState } from "react";
import styles from "../styles/AdminDashboard.module.css";
import EmployeesTable from "./EmployeesTable";
import Button from "components/Button/Button";
import { useNavigate } from "react-router-dom";
import { getEmployees } from "../api/AdminDashboardApi";

export default function AdminEmployeesDashboard() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        (async () => {
            let employees = await getEmployees();
            setEmployees(employees);
        })();
    }, [])

    return (
        <div className={styles.adminEmployeesDashboard}>
            <Button onClick={() => navigate("create")} type="button">Create Employee</Button>
            {employees.length > 0 ? 
                <EmployeesTable employees={ employees } />
                : <p>No employees yet, please create one.</p>}
        </div>
    )
}