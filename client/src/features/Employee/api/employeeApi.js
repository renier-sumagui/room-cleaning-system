import Axios from "axios";
import { apiUrl } from "src/config";

export async function getAssignedRooms(id) {
    console.log(id);
    let response = await Axios.get(`${apiUrl}/employees/${id}/rooms`);
    let { rooms }= response.data;

    return rooms;
}