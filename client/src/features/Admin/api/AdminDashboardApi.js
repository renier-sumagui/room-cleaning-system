import { apiUrl } from "src/config";
import Axios from "axios";

export function submitRoomCreation(roomInformation) {
    console.log(apiUrl);
    return true
}

export async function getEmployees() {
    let response = await Axios.get(`${apiUrl}/employees/non-admins`);
    let employees = response.data.non_admin_employees;

    return employees;
}

export async function getRooms() {
    let response = await Axios.get(`${apiUrl}/rooms`);
    return response.data;
}

export async function createEmployee(employee) {
    let response = await Axios.post(`${apiUrl}/employees/create`, employee);
    return response.data;
}

export async function createRoom(room) {
    const response = await Axios.post(`${apiUrl}/rooms/create`, room);
    return response.data;
}