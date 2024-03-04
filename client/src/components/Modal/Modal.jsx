import { useRef, useEffect } from "react";
import styles from "./Modal.module.css";
import image from "assets/focus.jpg";
import DangerBtnSolid from "components/Button/DangerBtnSolid";

export default function Modal({ showModal, setShowModal, children }) {
    let modalRef = useRef();

    useEffect(() => {
        if (showModal) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    }, [showModal]);

    function closeModal() {
        setShowModal(false);
    }

    return (
        <dialog onClick={e => closeModal(e)} ref={ modalRef }>
            <div className={ styles.dialogContent } onClick={e => e.stopPropagation()}>
                <div className={ styles.exitBtnContainer }>
                    <DangerBtnSolid type="button" onClick={ closeModal }>Close</DangerBtnSolid>
                </div>
                <main className={ styles.mainContent }>
                    { children }
                </main>
            </div>
        </dialog>
    );
}