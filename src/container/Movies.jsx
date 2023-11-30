import styles from "../style.js";
import Navbar from "../components/Navbar.jsx";
import MoviesList from "../components/MoviesList.jsx";
import Footer from "../components/Footer.jsx";

const Movies = () => {
    return (
        <div className="app__bg w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary`}>
                <div className={styles.boxWidth}>
                    <Navbar/>
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={styles.boxWidth}>
                    <MoviesList/>
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary`}>
                <div className={styles.boxWidth}>
                    <Footer/>
                </div>
            </div>



        </div>
    );
};

export default Movies;