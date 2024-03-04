import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AdminDashboard.module.css";
import Button from "components/Button/Button";
import StudentsTable from "components/Students/StudentsTable";
import { getAllStudents } from "components/Students/api/studentApi";
import LoadingSpinner from "components/Spinner/LoadingSpinner";

export default function AdminStudentsDashboard() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            let students = await getAllStudents();
            setLoading(false);
            setStudents(students);
        })();
    }, [])


    return (
        <div className={styles.adminStudentsDashboard}>
            <Button type="button" onClick={() => navigate("create")}>Create Student</Button>
            {loading && <LoadingSpinner />}
            {students.length > 0 && <StudentsTable students={ students } />}
        </div>
    )
}