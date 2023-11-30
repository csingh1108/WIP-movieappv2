import styles from "../style.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import MembershipHero from "../components/MembershipHero.jsx";

const Membership = () => {
    return (
        <div className="app__bg w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary navbar`}>
                <div className={styles.boxWidth}>
                    <Navbar/>
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={styles.boxWidth}>
                    <MembershipHero/>
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

export default Membership;