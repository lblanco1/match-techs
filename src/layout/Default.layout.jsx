import { Header } from "../components/Header";
import styles from "./Default.layout.module.css";
import { Outlet } from "react-router-dom";

export default function Default() {
    return( 
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}