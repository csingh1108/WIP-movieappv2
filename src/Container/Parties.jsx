import styles from "../style.js";
import PartiesHero from "../Components/PartiesHero.jsx";
import Footer from "../Components/Footer.jsx";


const Parties = () => {
    return (
        <>
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
        </>
    );
};

export default Parties;