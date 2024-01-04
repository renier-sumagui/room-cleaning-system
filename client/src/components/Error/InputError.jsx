import styles from "./Error.module.css";

export default function InputError({ error }) {
    return (
        <p className={styles.inputError}>{ error }</p>
    )
}