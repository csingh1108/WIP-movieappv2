import styles from "../style.js";
import {useNavigate} from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexCenter} h-screen`}>
                <div className={styles.boxWidth}>
                    <div className="flex flex-col justify-center items-center">
                        <ul className="text-white">
                            <li className="border-2 border-white w-[50vw] p-4 m-2 rounded-20 text-center rounded-[20px] mb-8 hover:text-secondary hover:border-secondary cursor-pointer"
                                onClick={() => navigate("/admin-movies")}>
                                Manage Movies
                            </li>

                            <li className="border-2 border-white w-[50vw] p-4 m-2 rounded-20 text-center rounded-[20px] mb-8 hover:text-secondary hover:border-secondary cursor-pointer"
                                onClick={() => navigate("/admin-screens")}>
                                Manage Screens
                            </li>

                            <li className="border-2 border-white w-[50vw] p-4 m-2 rounded-20 text-center rounded-[20px] mb-8 hover:text-secondary hover:border-secondary cursor-pointer"
                                onClick={() => navigate("/admin-users")}>
                                Manage Users
                            </li>

                            <li className="border-2 border-white w-[50vw] p-4 m-2 rounded-20 text-center rounded-[20px] mb-8 hover:text-secondary hover:border-secondary cursor-pointer"
                                onClick={() => navigate("/admin-bookings")}>
                                Manage Bookings
                            </li>

                            <li className="border-2 border-white w-[50vw] p-4 m-2 rounded-20 text-center rounded-[20px] mb-8 hover:text-secondary hover:border-secondary cursor-pointer"
                                onClick={() => navigate("/admin-movieTimes")}>
                                Manage Movie Times
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AdminDashboard;