import styles from "../styles/AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { spinalCase } from "src/helpers";

export default function RoomsTable({ rooms }) {
    const navigate = useNavigate();

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
                {rooms.map(room => {
                    return (
                        <tr 
                            key={ room.id } 
                            className="trLink" 
                            onClick={() => 
                                navigate(`/admin/rooms/${spinalCase(room.room_name)}`, {
                                    state: { roomId: room.id, roomName: room.room_name, roomNumber: room.room_number }
                                })}
                            >
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