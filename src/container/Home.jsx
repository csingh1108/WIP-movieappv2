import styles from "../style.js";
import Navbar from "../components/Navbar.jsx";
import FeaturedSlide from "../components/FeaturedSlide.jsx";
import NewsAndPromo from "../components/NewsAndPromo.jsx";
import Socials from "../components/Socials.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
    return (
        <div className="app__bg w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary navbar`}>
                <div className={styles.boxWidth}>
                    <Navbar/>
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={styles.boxWidth}>
                    <FeaturedSlide/>
                    <NewsAndPromo/>
                    <Socials/>
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

export default Home;