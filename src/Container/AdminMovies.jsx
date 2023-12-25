import styles from "../style.js";
import AdminMoviesList from "../Components/AdminMoviesList.jsx";
import { useState} from "react";
import {useNavigate} from "react-router-dom";
import AdminSearchbar from "../Components/AdminSearchbar.jsx";
import {SEARCH_MOVIES} from "../GraphQLQueries/index.jsx";

const AdminMovies = () => {
    const navigate = useNavigate();
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
                        searchQuery={SEARCH_MOVIES}
                    />
                    <label className="text-white">Search by movie name</label>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => navigate("/admin-movies/create")}
                            className="rounded-full px-2 py-1 bg-white text-black border-black border-[2px] w-[80px] h-[40px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold "
                        >
                            Create
                        </button>
                    </div>
                    <AdminMoviesList filteredMovies={resultsData}/>
                </div>
            </div>

        </>
    );
};

export default AdminMovies;