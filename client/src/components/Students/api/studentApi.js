import Axios from "axios";
import { apiUrl } from "src/config";

export async function getAllStudents() {
    const response = await Axios.get(`${apiUrl}/students/all`);
    
    return response.data;
}