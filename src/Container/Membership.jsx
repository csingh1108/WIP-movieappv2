import styles from "../style.js";
import Footer from "../Components/Footer.jsx";
import MembershipHero from "../Components/MembershipHero.jsx";

const Membership = () => {
    return (
        <>
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
        </>
    );
};

export default Membership;