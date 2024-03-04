import Axios from "axios";
import { apiUrl } from "src/config";
import { headers } from "src/config";

export async function getAssignedRooms(id) {
    let response = await Axios.get(`${apiUrl}/employees/${id}/rooms`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    });
    let { rooms }= response.data;

    return rooms;
}

export async function uploadImage(formData, userId, roomId) {
    const response = await Axios.post(
        `${apiUrl}/images/upload`,
        formData, {
            headers,
            params: {
                employee_id: userId,
                room_id: roomId
            }
        }
    );
    return response.data;
}

export async function getAcceptedImages(roomId) {
    const response = await Axios.get(`${apiUrl}/images/room/accepted/${roomId}`, {
        headers
    });
    return response.data;
}

export async function getAssignedStudents(employeeId) {
    const response = await Axios.get(`${apiUrl}/employees/${employeeId}/students`);

    return response.data;
}

export async function uploadStudentExcel(formData) {
    const response = await Axios.post(`${apiUrl}/students/excel-update`, formData);
}