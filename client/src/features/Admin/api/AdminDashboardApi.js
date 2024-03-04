import { apiUrl } from "src/config";
import Axios from "axios";
import { headers } from "src/config";

export function submitRoomCreation(roomInformation) {
    return true
}

export async function getEmployees() {
    let response = await Axios.get(`${apiUrl}/employees/non-admins`, {
        headers: headers
    });


    let employees = response.data.non_admin_employees;

    return employees;
}

export async function getRooms() {
    let response = await Axios.get(`${apiUrl}/rooms`, {
        headers: headers
    });
    return response.data;
}

export async function createEmployee(employee) {
    try {
        let response = await Axios.post(`${apiUrl}/employees/create`, employee, {
            headers: headers
        });
        return response.data;
    } catch (err) {
        return { success: false, errors: err.response.data.message };
    }
}

export async function createRoom(room) {
    const response = await Axios.post(`${apiUrl}/rooms/create`, room, {
        headers: headers
    });
    return response.data;
}

export async function createStudent(student) {
    const response = await Axios.post(`${apiUrl}/students/create`, student, {
        headers: headers
    })

    return response.data;
}

export async function getImagesOfRoom(id) {
    const response = await Axios.get(`${apiUrl}/images/room/${id}`);
    return response.data;
}
