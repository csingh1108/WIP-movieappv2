import {useState} from 'react';
import styles from "../style.js";
import AdminSearchbar from "../Components/AdminSearchbar.jsx";
import AdminBookingList from "../Components/AdminBookingList.jsx";
import {SEARCH_BOOKINGS} from "../GraphQLQueries/index.jsx";


const AdminBookings = () => {
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
                        searchQuery={SEARCH_BOOKINGS}
                    />
                    <label className="text-white">Search by email</label>
                    <AdminBookingList filteredBookings={resultsData}/>
                </div>
            </div>
        </>
    );
};

export default AdminBookings;