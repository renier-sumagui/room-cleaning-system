import styles from "./Button.module.css";

export default function DangerBtnSolid({ onClick, type, children }) {
    return (
        <button onClick={ onClick } className={`${styles.button} ${styles.danger}` } type={ type }>
            { children }
        </button>
    )
}