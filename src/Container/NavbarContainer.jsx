
import Navbar from '../Components/Navbar.jsx';
import styles from "../style.js";

const NavbarContainer = ({ children }) => {
    return (
        <div className="app__bg w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary navbar`}>
                <div className={styles.boxWidth}>
                    <Navbar />
                </div>
            </div>
            {children}
        </div>
    );
};

export default NavbarContainer;
