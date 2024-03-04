import { useState, useEffect } from "react";
import Axios from "axios";
import { apiUrl } from "src/config";
import styles from "../styles/AdminDashboard.module.css"
import DangerBtnSolid from "components/Button/DangerBtnSolid";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";

export default function Image({ id, image_url, email, first_name, last_name, setSeed, setLoading }) {
    let [showModal, setShowModal] = useState(false);

    async function handleAccept() {
        setLoading(true);
        await Axios.post(`${apiUrl}/images/process`, {
            id: id,
            email: email,
            status: "accept"
        });
        setSeed(Math.random());
    }

    async function handleReject() {
        setLoading(true);
        await Axios.post(`${apiUrl}/images/process`, {
            id: id,
            email: email,
            status: "reject"
        });
        setSeed(Math.random());
    }
    
    function imageClick() {
        setShowModal(true);
    }

    useEffect(() => {
        console.log("Show modal:", showModal);
    }, [showModal]);

    return (
        <div className={ styles.imageCard }>
            <div onClick={() => imageClick()} className={ styles.imageContainer } style={{ backgroundImage: `url(${image_url})`} }>
            </div>
            <p>Uploaded By: <span>{first_name} {last_name}</span></p>
            <div className={ styles.imageDetails }>
                <div className={ styles.imageButtons }>
                    <Button type="button" onClick={() => handleAccept()}>Accept</Button>
                    <DangerBtnSolid type="button" onClick={() => handleReject()}>Reject</DangerBtnSolid>
                </div>
            </div>
            <Modal showModal={ showModal } setShowModal={ setShowModal }>
                <img className={ styles.imageModal } src={image_url} />
            </Modal>
        </div>
    )
}