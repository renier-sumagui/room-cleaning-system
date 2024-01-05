import styles from "./Error.module.css";

export default function ErrorGroup(errors) {
    return (
        <div className={styles.errorGroups}>
            {errors.map(error => {
                return <p>{ error }</p>
            }) }
        </div>
    )
}