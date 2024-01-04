import styles from "../styles/AdminDashboard.module.css";

export default function EmployeesTable({ employees }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => {
                    return (
                        <tr key={ employee.employee_id }>
                            <td>{ employee.employee_id }</td>
                            <td>{ employee.first_name } { employee.last_name }</td>
                            <td>{ employee.email }</td>
                            <td>{ employee.contact_number }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}