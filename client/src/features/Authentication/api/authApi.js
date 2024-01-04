import { apiUrl } from "src/config.js";
import Axios from "axios";

export async function submitLoginForm(credentials) {
    let response = await Axios.post(`${apiUrl}/employees/login`, credentials);
    let { data } = response;

    return data;
}