import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/EmployeeDashboardPage.module.css";
import AssignedRoomsTable from "../components/AssignedRoomsTable";
import { getAssignedRooms } from "../api/employeeApi";
import { useUserContext } from "contexts/UserContext.jsx";

export default function ExmployeeDashboardPage() {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        (async () => {
            const isNull = user === null;
            console.log(user);
            if (!isNull && !user.is_admin) {
                console.log("not admin")
                let rooms = await getAssignedRooms(user.id);
                setRooms(rooms);
            } else if (!isNull && user.is_admin) {
                navigate("/admin");
            } else {
                navigate("/login");
            }
        })();
    }, [])

    return (
        <div className={styles.employeeDashboardPage}>
            {rooms.length < 1 ? <h1>No rooms assigned yet. </h1> 
                : <>
                    <h1>Assigned Rooms</h1>
                    <AssignedRoomsTable rooms={ rooms }/>
                </>}

        </div>
    )
}