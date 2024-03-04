import { useState, useEffect } from "react";
import styles from "../styles/EmployeeDashboardPage.module.css";
import StudentsTable from "components/Students/StudentsTable";
import { getAssignedStudents } from "../api/employeeApi";
import LoadingSpinner from "components/Spinner/LoadingSpinner";
import Button from "components/Button/Button";
import Axios from "axios";
import { apiUrl } from "src/config";
import { uploadStudentExcel } from "../api/employeeApi";

export default function AssignedStudentsTable() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const user = JSON.parse(localStorage.getItem("user"));

    async function downloadExcel() {
        try {
            const response = await Axios.get(`${apiUrl}/employees/${user.id}/students/excel`, { responseType: "blob" });
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'students.xlsx';
            link.click();
        } catch (error) {
            console.error('Error downloading students:', error);
        }
    }

    async function updateSelected(event) {
        setSelectedFile(event.target.files[0]);
    }
    async function submitFile(event) {
        event.preventDefault();
        
        console.log(selectedFile.type);

        let formData = new FormData();
        formData.append("formData", selectedFile);
        setLoading(true);
        await uploadStudentExcel(formData);
        setLoading(false);
        getStudents();
    }

    async function getStudents() {
        setLoading(true);
        const students = await getAssignedStudents(user.id);
        setLoading(false);
        setStudents(students);
    }

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div>
            <Button type={"button"} onClick={() => downloadExcel()}>Download csv</Button>
            <form onSubmit={e => submitFile(e)}>
                <input type="file" onChange={e => updateSelected(e)} />
                <button type="submit">Submit</button>
            </form>
            {loading && <LoadingSpinner />}
            {students.length > 0 && <StudentsTable students={ students } />}
        </div>
    )
}