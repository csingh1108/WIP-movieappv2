import {constructionimage} from "../assets/index.js";
import styles from "../style.js";
import Navbar from "../components/Navbar.jsx";

const Construction = () => {
    return (
        <div className="bg-primary w-full h-screen overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary navbar`}>
                <div className={styles.boxWidth}>
                    <Navbar/>
                </div>
            </div>
            <div className="mt-24 text-center">
                <h1 className="font-montserrat font-bold text-[48px] text-white">Uh oh!</h1>
                <p className="font-montserrat font-bold text-[32px] text-white">This page is still under construction. Check back later!</p>
                <img src={constructionimage} alt="cat disappoint" className="w-[400px] mx-auto mt-12 rounded-[10px]"/>
            </div>
        </div>
    );
};

export default Construction;