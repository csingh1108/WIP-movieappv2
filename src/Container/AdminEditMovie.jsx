import styles from "../style.js";
import AdminEditMoviesHero from "../Components/AdminEditMoviesHero.jsx";

const AdminEditMovie = () => {
    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexStart} sm:h-screen`}>
                <div className={styles.boxWidth}>
                    <AdminEditMoviesHero/>
                </div>
            </div>
        </>
    );
};

export default AdminEditMovie;
