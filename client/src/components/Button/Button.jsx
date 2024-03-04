import styles from "./Button.module.css";

export default function Button({ onClick, type, children }) {
    return (
        <button onClick={ onClick } className={`${styles.button} ${styles.green}`} type={ type }>
            { children }
        </button>
    )
}