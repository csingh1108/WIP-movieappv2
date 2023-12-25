import styles from "../style.js";
import AdminScreensList from "../Components/AdminScreensList.jsx";


const AdminScreens = () => {

    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexStart} h-screen mt-16`}>
                <div className={styles.boxWidth}>
                    <AdminScreensList/>
                </div>
            </div>
        </>
    );
};

export default AdminScreens;