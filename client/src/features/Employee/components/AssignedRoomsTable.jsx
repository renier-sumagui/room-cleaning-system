import styles from "../styles/EmployeeDashboardPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingSpinner from "components/Spinner/LoadingSpinner";
import { getAssignedRooms } from "../api/employeeApi";
import { spinalCase } from "src/helpers";
import Button from "components/Button/Button";

export default function AssignedRoomsTable() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        console.log('USER', user);
        (async () => {
            setLoading(true);
            let rooms = await getAssignedRooms(user.id);
            setLoading(false);
            setRooms(rooms);
        })();
    }, [])

    if (rooms.length > 0) {
        return (
            <div>
                <Button onClick={() => navigate(-1)}>Back</Button>
                <table className={ styles.table }>
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
                                    onClick={() => navigate(`${spinalCase(room.room_name)}`, {
                                        state: {
                                            roomId: room.id
                                        }
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
            </div>
        )
    } else if (loading) {
        return <LoadingSpinner />
    } else {
        return <h1>No rooms assigned yet. </h1> ;
    }
}