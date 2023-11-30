import { useState } from 'react';
import styles from "../style.js";
import Navbar from "../components/Navbar.jsx";
import LoginMain from "../components/LoginMain.jsx";
import Footer from "../components/Footer.jsx";

const Login = () => {
    return (
        <div className="app__bg w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary navbar`}>
                <div className={styles.boxWidth}>
                    <Navbar isLoginPage={true} />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} mb-14 h-screen`}>
                <div className={styles.boxWidth}>
                    <LoginMain/>
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

export default Login;
