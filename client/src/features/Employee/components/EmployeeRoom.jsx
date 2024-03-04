import { useState, useEffect } from "react";
import styles from "../styles/EmployeeRoom.module.css";
import UploadImageForm from "./UploadImageForm";
import ImageCard from "./ImageCard";
import { getAcceptedImages } from "../api/employeeApi";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "components/Spinner/LoadingSpinner";

export default function EmployeeRoom() {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [images, setImages] = useState([]);

    useEffect(() => {
        (async () => {
            let images = await getAcceptedImages(location.state.roomId);
            console.log(images);
            setImages(images);
        })();
    }, [])

    return (
        <div className={styles.room}>
            <div className={ styles.roomImages }>
                {images.length > 0 ? 
                    images.map(image => {
                        console.log(image)
                        return <ImageCard 
                                    imageUrl={ image.image_url } 
                                    uploadedBy={ `${image.uploaded_by.first_name} ${image.uploaded_by.last_name}` }
                                />
                    }) : loading ? <LoadingSpinner /> : <h1>No accepted images.</h1>}
                    
            </div>
            <UploadImageForm />
        </div>
    )
}