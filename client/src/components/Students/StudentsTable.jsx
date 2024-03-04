import styles from "./Students.module.css";

export default function StudentsTable({ students }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Grade</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => {
                    return (
                        <tr key={ student.id }>
                            <td>{ student.first_name }</td>
                            <td>{ student.last_name }</td>
                            <td>{ student.email }</td>
                            <td>{ student.grade !== null ? student.grade : "No grade" }</td>
                            <td>{ student.status !== null ? student.status : "No status" }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}