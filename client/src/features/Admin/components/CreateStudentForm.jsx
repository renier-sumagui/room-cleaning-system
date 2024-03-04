import { useState, useEffect } from "react";
import Button from "components/Button/Button";
import styles from "../styles/AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "components/Spinner/LoadingSpinner";
import InputError from "components/Error/InputError";
import { getEmployees, createStudent } from "../api/AdminDashboardApi";

export default function CreateStudentForm() {
    const navigate = useNavigate();
    let [loading, setLoading] = useState(false);
    let [emailError, setEmailError] = useState(false);
    const [availableEmployees, setAvailableEmployees] = useState([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [teachers, setTeachers] = useState([]);

    function assignTeacher(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const name = selectedOption.getAttribute("data-name");
        const id = selectedOption.value;

        if (!teachers.includes(id)) {
            setSelectedTeachers(prev => [...prev, name]);
            setTeachers(prev => [...prev, id]);
        } else {
            return;
        }

    }

    async function handleSubmit(event) {
        let regex = /^[0-9]+$/;
        event.preventDefault();

        setLoading(true);
        let response = await createStudent({ firstName, lastName, email, birthday, teachers })
        setLoading(false);
        if (response.success) {
            navigate(-1);
        } else {
            setEmail(true);
        }
    }

    useEffect(() => {
        (async () => {
            let employees = await getEmployees();
            setAvailableEmployees(employees);
        })();
    }, [])

    return (
        <>
            {loading && <LoadingSpinner />}
            <Button type="button" onClick={() => navigate(-1)}>Go Back</Button>
            <form className={ styles.createStudentForm } onSubmit={e => handleSubmit(e)}>
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
                    <div>
                        <input type="email" value={ email } onChange={e => setEmail(e.target.value)} required />
                        {emailError && <InputError error="Email is already taken" />}
                    </div>
                </label>
                <label>
                    <span>Birthday: </span>
                    <input type="date" value={ birthday } onChange={e => setBirthday(e.target.value)} required />
                </label>
                <label>
                    <span>Assign Teachers:</span>
                    <select required onChange={e => assignTeacher(e)}>
                        {availableEmployees.length > 0 &&
                            availableEmployees.map(employee => {
                                let fullName = `${employee.first_name} ${employee.last_name}`;
                                return <option key={ employee.id } value={ employee.id } data-name={ fullName }>{ fullName }</option>
                            })}
                    </select>
                </label>
                <div className={ styles.assignedEmployees }>
                    <span>Assigned Teachers:</span>
                    <p>
                        {selectedTeachers.length > 0 
                            && 
                            selectedTeachers.map((teacher, index, arr) => {
                                if (index === arr.length - 1) {
                                    return teacher;
                                } else {
                                    return `${teacher}, `
                                }
                            })}
                    </p>
                </div>

                <input className={ styles.submit } type="submit" value="Create" disabled={loading} />
            </form>
        </>
    )
}