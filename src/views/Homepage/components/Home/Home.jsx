import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.container} id="home">
            <div className={styles.textContainer}>
                <h1 className={styles.outlineTitle}>THE OCEAN</h1>
                <h1>TO EXPLORE</h1>
                <a href="/login">JOIN THE DIVE</a>
            </div>
        </div>
    );
}

export default Home;
