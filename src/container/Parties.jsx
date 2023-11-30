import styles from "../style.js";
import Navbar from "../components/Navbar.jsx";
import PartiesHero from "../components/PartiesHero.jsx";
import Footer from "../components/Footer.jsx";


const Parties = () => {
    return (
        <div className="app__bg w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary navbar`}>
                <div className={styles.boxWidth}>
                    <Navbar/>
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={styles.boxWidth}>
                    <PartiesHero/>
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

export default Parties;