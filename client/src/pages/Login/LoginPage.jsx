import LoginForm from "features/Authentication/components/LoginForm.jsx";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
    return (
        <div className={styles.loginPage}>
            <main className={styles.main}>
                <h1 className={styles.title}>Room Cleaning System</h1>
                <LoginForm />
            </main>
        </div>
    )
}