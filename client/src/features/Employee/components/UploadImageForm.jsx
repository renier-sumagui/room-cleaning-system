import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "../styles/EmployeeRoom.module.css";
import Button from "components/Button/Button";
import LoadingSpinner from "components/Spinner/LoadingSpinner";
import { uploadImage } from "../api/employeeApi";

export default function UploadImageForm() {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    function handleFileChange(event) {
        setSelectedFiles(Array.from(event.target.files));
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();

        selectedFiles.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        try {
            setLoading(true);
            const response = await uploadImage(formData, user.id, location.state.roomId);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    }

    return (
        <form className={ styles.uploadImageForm } onSubmit={e => handleSubmit(e)}>
            <input type="file" multiple={ true } onChange={ handleFileChange } />
            <div>
                <Button type="submit">Upload</Button>
            </div>
            {loading &&<LoadingSpinner />}
        </form>
    )
}