import styles from "../style.js";
import LoginHero from "../Components/LoginHero.jsx";
import Footer from "../Components/Footer.jsx";


const Login = () => {
    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexCenter} mb-14 h-screen`}>
                <div className={styles.boxWidth}>
                    <LoginHero/>
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

export default Login;
