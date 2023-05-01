import styles from "./Header.module.css"

export default function Header() {
    return(
        <header className={styles.container}>
            <div className={styles.content}>
                <h1>Match Tech</h1>
                <h2>AS MELHORES VAGAS QUE DÃO MATCH COM VOCÊ</h2>
            </div>
        </header>
    )
}