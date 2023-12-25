import React from 'react';
import styles from "../style.js";
import AdminTimesList from "../Components/AdminTimesList.jsx";


const AdminTimes = () => {
    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexStart} h-screen`}>
                <div className={styles.boxWidth}>
                    <AdminTimesList/>
                </div>
            </div>
        </>
    );
};

export default AdminTimes;