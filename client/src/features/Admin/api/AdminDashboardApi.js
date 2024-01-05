import { apiUrl } from "src/config";
import Axios from "axios";

export function submitRoomCreation(roomInformation) {
    return true
}

export async function getEmployees() {
    let response = await Axios.get(`${apiUrl}/employees/non-admins`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    });


    let employees = response.data.non_admin_employees;

    return employees;
}

export async function getRooms() {
    let response = await Axios.get(`${apiUrl}/rooms`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    });
    return response.data;
}

export async function createEmployee(employee) {
    try {
        let response = await Axios.post(`${apiUrl}/employees/create`, employee, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;
    } catch (err) {
        return { success: false, errors: err.response.data.message };
    }
}

export async function createRoom(room) {
    const response = await Axios.post(`${apiUrl}/rooms/create`, room, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    });
    return response.data;
}