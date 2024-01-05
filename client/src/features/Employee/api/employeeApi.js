import Axios from "axios";
import { apiUrl } from "src/config";

export async function getAssignedRooms(id) {
    let response = await Axios.get(`${apiUrl}/employees/${id}/rooms`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    });
    let { rooms }= response.data;

    return rooms;
}