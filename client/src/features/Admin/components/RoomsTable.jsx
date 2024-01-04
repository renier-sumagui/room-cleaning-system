import styles from "../styles/AdminDashboard.module.css";

export default function RoomsTable({ rooms }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Room Number</th>
                    <th>Room Name</th>
                    <th>Capacity</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Science Room</td>
                    <td>50</td>
                </tr>
                {rooms.map(room => {
                    return (
                        <tr key={ room.id }>
                            <td>{ room.room_number }</td>
                            <td>{ room.room_name }</td>
                            <td>{ room.capacity }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}