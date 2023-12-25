import styles from "../style.js";
import AdminUserList from "../Components/AdminUserList.jsx";
import AdminSearchbar from "../Components/AdminSearchbar.jsx";
import {useState} from "react";
import {SEARCH_USERS} from "../GraphQLQueries/index.jsx";


const AdminUsers = () => {
    const [resultsData, setResultsData ] = useState();
    const updateResults = (data) => {
        setResultsData(data)
    }

    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexStart} h-screen text-center`}>
                <div className={styles.boxWidth}>
                    <AdminSearchbar
                        updateResults={updateResults}
                        searchQuery={SEARCH_USERS}
                        />
                    <label className="text-white">Search by name</label>
                    <AdminUserList filteredUsers={resultsData}/>
                </div>
            </div>
        </>
    );
};

export default AdminUsers;