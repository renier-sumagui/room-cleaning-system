import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "../styles/AdminDashboard.module.css";
import Image from "./Image";
import { getImagesOfRoom } from "../api/AdminDashboardApi";
import LoadingSpinner from "components/Spinner/LoadingSpinner";


export default function Room() {
    const [images, setImages] = useState([]);
    const [seed, setSeed] = useState(1);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        console.log(location.state.roomId);
        (async () => {
            setLoading(true);
            const response = await getImagesOfRoom(location.state.roomId);
            setLoading(false);
            setImages(response);
        })()
    }, [seed])

    return (
        <div className={styles.room}>
            <h1>{ location.state.roomName } #{ location.state.roomNumber }</h1>
            {loading && <LoadingSpinner />}
            <div className={styles.roomImages}>
                {images.length > 0 && 
                    images.map(image => {
                        return <Image
                                    id={image.id}
                                    image_url={image.image_url}
                                    email={image.email}
                                    first_name={image.first_name}
                                    last_name={image.last_name}
                                    key={image.id}
                                    setSeed={setSeed}
                                    setLoading={setLoading}
                                />
                    })}
            </div>
        </div>
    )
}