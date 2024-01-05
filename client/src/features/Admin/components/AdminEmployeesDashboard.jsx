import { useEffect, useState } from "react";
import styles from "../styles/AdminDashboard.module.css";
import EmployeesTable from "./EmployeesTable";
import Button from "components/Button/Button";
import { useNavigate } from "react-router-dom";
import { getEmployees } from "../api/AdminDashboardApi";
import LoadingSpinner from "components/Spinner/LoadingSpinner";

export default function AdminEmployeesDashboard() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            let employees = await getEmployees();
            setLoading(false);
            setEmployees(employees);
        })();
    }, [])

    return (
        <div className={styles.adminEmployeesDashboard}>
            <Button onClick={() => navigate("create")} type="button">Create Employee</Button>
            {employees.length > 0 ? 
                <EmployeesTable employees={ employees } />
                : loading ? <LoadingSpinner /> : <p>No employees yet, please create one.</p>}
        </div>
    )
}