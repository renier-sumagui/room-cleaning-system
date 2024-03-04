import { useState } from "react";
import image from "assets/focus.jpg";
import styles from "../styles/EmployeeRoom.module.css";
import Modal from "components/Modal/Modal";

export default function ImageCard({ imageUrl, uploadedBy }) {
    const [showModal, setShowModal] = useState();

    function imageClick() {
        setShowModal(true);
    }

    return (
        <div className={ styles.imageCard }>
            <div className={ styles.image } 
                onClick={() => imageClick()}
                style={{ backgroundImage: `url(${imageUrl})` }}>
            </div>
            <p>Uploaded by: <span>{ uploadedBy }</span></p>
            <Modal showModal={ showModal } setShowModal={ setShowModal }>
                <img className={ styles.imageModal } src={ imageUrl } />
            </Modal>
        </div>
    )
}