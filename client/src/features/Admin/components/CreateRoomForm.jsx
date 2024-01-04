import { useEffect, useState } from "react";
import Button from "components/Button/Button";
import styles from "../styles/AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { createRoom, getEmployees } from "../api/AdminDashboardApi";

export default function CreateRoomForm() {
    const navigate = useNavigate();
    const [availableEmployees, setAvailableEmployees] = useState([]);

    const [roomNum, setRoomNum] = useState("");
    const [roomName, setRoomName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    function validateNum(value) {
        let regex = /^[0-9]+$/;

        if (!regex.test(value)) {
            
        }
    }

    function handleRoomNum(value) {
        setRoomNum(value);
    }

    function handleRoomName(value) {
        setRoomName(value);
    }

    function handleCapacity(value) {
        setCapacity(value);
    }

    function assignEmployee(event) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const dataName = selectedOption.getAttribute('data-name');
        const id =  selectedOption.value;

        if (!employees.includes(id)) {
            setEmployees(prev => [...prev, id]);
            setSelectedEmployees(prev => [...prev, dataName]);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let regex = /^[0-9]+$/;

        if (employees.length < 1 && !regex.test(capacity)) {
            return;
        } else {
            const data = await createRoom({
                room_number: roomNum,
                room_name: roomName,
                capacity: capacity,
                employee_ids: employees
            });
            if (data.success) {
                navigate(-1);
            }
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
            <Button type="button" onClick={() => navigate(-1)}>Go Back</Button>
            <form className={styles.createRoomsForm} onSubmit={e => handleSubmit(e)}>
                <label>
                    <span>Room number:</span>
                    <div>
                        <input  required type="text" value={ roomNum } onChange={e => handleRoomNum(e.target.value)} />
                    </div>
                </label>
                <label>
                    <span>Room name:</span>
                    <div>
                        <input  required type="text" value={ roomName } onChange={e => handleRoomName(e.target.value)} />
                    </div>
                </label>
                <label>
                    <span>Capacity:</span>
                    <div>
                        <input  required type="text" value={ capacity } onChange={e => handleCapacity(e.target.value)} />
                    </div>
                </label>
                <label>
                    <span>Assign employees:</span> 
                    <select required onChange={e => assignEmployee(e)}>
                        <option disabled>Please assign employees</option>
                        {availableEmployees.length > 0 &&
                            availableEmployees.map(employee => {
                                let fullName = `${employee.first_name} ${employee.last_name}`;
                                return <option key={ employee.id } value={ employee.id } data-name={ fullName }>{ fullName }</option>
                            })}
                    </select>
                </label>
                <div className={ styles.assignedEmployees }>
                    <span>Assigned Employees:</span>
                    <p>
                        {selectedEmployees.length > 0 
                            && 
                            selectedEmployees.map((employee, index, arr) => {
                                if (index === arr.length - 1) {
                                    return employee;
                                } else {
                                    return `${employee}, `
                                }
                            })}
                    </p>
                </div>

                <input className={ styles.submit } type="submit" value="Create" />
            </form>
        </>
    )
}