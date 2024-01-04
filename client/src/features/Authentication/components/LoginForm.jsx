import { useState } from "react";
import { useUserContext } from "contexts/UserContext.jsx";
import styles from "./LoginForm.module.css";
import InputError from "components/Error/InputError.jsx";
import { submitLoginForm } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [employeeId, setEmployeeId] = useState("");
    const [employeeIdErr, setEmployeeIdErr] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();

    /**
     * Checks if input is valid, updates the error states
     * Returns TRUE if has error else FALSE
     */
    function checkInput(value, setErrState) { 
        if (value.length > 0) {
            setErrState(false);
            return false;
        } else {
            setErrState(true);
            return true;
        }
    }

    function handleEmployeeId(value) {
        setEmployeeId(value);
        checkInput(value, setEmployeeIdErr);
    }

    function handlePassword(value) {
        setPassword(value);
        checkInput(value, setPasswordErr);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!checkInput(employeeId, setEmployeeIdErr) && !checkInput(password, setPasswordErr)) {
            // Checks if credentials matched an employee and has no error
            let result = await submitLoginForm({ employee_id: employeeId, password: password });
            if (result.success) { 
                result.user.is_admin ? navigate("/admin") : navigate("/employee");
                setUser(result.user);
            }
        }
    }

    return (
        <form className={styles.loginForm} onSubmit={e => handleSubmit(e)}>
            <h2 className={styles.title}>Employee Login</h2>
            <div className={styles.inputs}>
                <div>
                    <input 
                        data-gap-size="small" 
                        type="text" 
                        placeholder="Employee ID" 
                        onChange={e => handleEmployeeId(e.target.value)}
                    />
                    { employeeIdErr && <InputError error="Employee ID is required" /> }
                </div>
                <div>
                    <input 
                        data-gap-size="small" 
                        type="password" 
                        placeholder="Password" 
                        onChange={e => handlePassword(e.target.value)}
                    />
                    { passwordErr && <InputError error="Password is required" /> }
                </div>
            </div>
            <input className={styles.submit} type="submit" value="Login" />
        </form>
    )
}