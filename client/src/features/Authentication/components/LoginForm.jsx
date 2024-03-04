import { useState, useEffect } from "react";
import { useUserContext } from "contexts/UserContext.jsx";
import styles from "./LoginForm.module.css";
import InputError from "components/Error/InputError.jsx";
import { submitLoginForm } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "components/Spinner/LoadingSpinner";

export default function LoginForm() {
    const [employeeId, setEmployeeId] = useState("");
    const [employeeIdErr, setEmployeeIdErr] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false);

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
            setLoading(true);
            let result = await submitLoginForm({ employee_id: employeeId, password: password });
            setLoading(false);

            if (result.success) { 
                result.user.is_admin ? navigate("/admin") : navigate("/employee/home");
                localStorage.setItem("user", JSON.stringify(result.user));
                setUser(result.user);
            } else {
                setInvalidCredentials(true);
            }
        }
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user !== null) {
            setUser(user);
        } else {
            console.log("USER IS NOT SET")
        }
    }, [])

    return (
        <>
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
                        { invalidCredentials && <InputError error="Invalid credentials" />}
                    </div>
                </div>
                <input className={styles.submit} type="submit" value="Login" />
            </form>
            {loading && <LoadingSpinner />}
        </>
    )
}