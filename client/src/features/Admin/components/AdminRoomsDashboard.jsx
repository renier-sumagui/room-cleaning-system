import { useEffect, useState } from "react";
import Button from "components/Button/Button";
import RoomsTable from "./RoomsTable";
import styles from "../styles/AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../api/AdminDashboardApi";

export default function AdminRoomsDashboard() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        (async () => {
            let data = await getRooms();
            setRooms(data.rooms);
        })();
    }, [])

    return (
        <div className={styles.adminRoomsDashboard}>
            <Button onClick={() => navigate("create")} type="button">Create Room</Button>
            {rooms.length > 0 ? <RoomsTable rooms={ rooms } />
                : <p>No rooms yet, please create one.</p>}
        </div>
    )
}