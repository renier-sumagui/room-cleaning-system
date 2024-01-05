import { useEffect, useState } from "react";
import Button from "components/Button/Button";
import RoomsTable from "./RoomsTable";
import styles from "../styles/AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../api/AdminDashboardApi";
import LoadingSpinner from "components/Spinner/LoadingSpinner.jsx";

export default function AdminRoomsDashboard() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let data = await getRooms();
            setLoading(false);
            setRooms(data.rooms);
        })();
    }, [])

    return (
        <div className={styles.adminRoomsDashboard}>
            <Button onClick={() => navigate("create")} type="button">Create Room</Button>
            {rooms.length > 0 ? <RoomsTable rooms={ rooms } />
                : loading ? <LoadingSpinner /> : <p>No rooms yet, please create one.</p>}
        </div>
    )
}