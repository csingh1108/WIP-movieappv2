import styles from "../style.js";
import AdminCreateMovieHero from "../Components/AdminCreateMovieHero.jsx";

const AdminCreateMovie = () => {
    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexCenter} h-screen`}>
                <div className={styles.boxWidth}>
                    <AdminCreateMovieHero/>
                </div>
            </div>

        </>
    );
};

export default AdminCreateMovie;