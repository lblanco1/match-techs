import styles from "./Header.module.css"
import Logo from "../../../../../../assets/img/Logo.svg"

export default function Header() {
    return(
        <header className={styles.container}>
            <div className={styles.content}>
                <img src={Logo} alt="Logo" className={styles.matchtechs} />
                <h2>AS MELHORES VAGAS QUE DÃO MATCH COM VOCÊ</h2>
            </div>
        </header>
    )
}