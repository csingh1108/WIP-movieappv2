import styles from "../style.js";
import Navbar from "../components/Navbar.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import Footer from "../components/Footer.jsx";


const MovieDetails = () => {


    return (
        <div className="app__bg w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary navbar`}>
                <div className={styles.boxWidth}>
                    <Navbar/>
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} mt-12`}>
                <div className={styles.boxWidth}>
                    <VideoPlayer/>
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

export default MovieDetails;