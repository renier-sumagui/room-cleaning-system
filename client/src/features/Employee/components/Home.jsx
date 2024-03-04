import Button from "components/Button/Button"
import styles from "../styles/EmployeeDashboardPage.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className={ styles.home }>
            <Button type="button" onClick={() => navigate("/employee/assigned-rooms")}>Assigned Rooms</Button>
            <Button type="button" onClick={() => navigate("/employee/assigned-students")}>Assigned Students</Button>
        </div>
    )
}