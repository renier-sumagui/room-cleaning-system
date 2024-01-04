import Button from "components/Button/Button";
import styles from "../styles/AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createEmployee } from "../api/AdminDashboardApi";

export default function CreateEmployeeForm() {
    const navigate = useNavigate();

    const [employeeId, setEmployeeId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [contactNumber, setContactNumber] = useState("");

    async function handleSubmit(event) {
        let regex = /^[0-9]+$/;

        event.preventDefault();
        if (!regex.test(contactNumber)) {
            return;
        } else {
            let response = await createEmployee({
                employee_id: employeeId,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: birthday,
                birthday: birthday,
                contact_number: contactNumber
            });

            if (response.success) {
                navigate(-1);
            }
        };
    }

    return (
        <>
            <Button type="button" onClick={() => navigate(-1)}>Go Back</Button>
            <form className={styles.createEmployeeForm} onSubmit={e => handleSubmit(e)}>
                <label>
                    <span>Employee ID:</span> 
                    <input type="text" value={ employeeId } onChange={e => setEmployeeId(e.target.value)} required />
                </label>
                <label>
                    <span>First name:</span> 
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </label>
                <label>
                    <span>Last name:</span> 
                    <input type="text" value={ lastName } onChange={e => setLastName(e.target.value)} required />
                </label>
                <label>
                    <span>Email:</span>
                    <input type="email" value={ email } onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    <span>Birthday: </span>
                    <input type="date" value={ birthday } onChange={e => setBirthday(e.target.value)} required />
                </label>
                <label>
                    <span>Contact number:</span> 
                    <input type="text" value={ contactNumber } onChange={e => setContactNumber(e.target.value)} required/>
                </label>

                <input className={ styles.submit } type="submit" value="Create" />
            </form>
        </>
    )
}