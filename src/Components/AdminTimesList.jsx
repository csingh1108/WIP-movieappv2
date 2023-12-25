import React, {useContext, useEffect, useState} from 'react';
import {JwtContext} from "../Context/JwtContext.jsx";
import {useMutation, useQuery} from "@apollo/client";
import {
    DELETE_MOVIE_TIME,
    GET_ALL_MOVIE_TIMES_FULL
} from "../GraphQLQueries/index.jsx";
import {toast, ToastContainer} from "react-toastify";
import {formatDate} from "../Helpers/index.jsx";
import {useNavigate} from "react-router-dom";


const AdminTimesList = ({filteredMovieTimes}) => {
    const navigate = useNavigate();
    const [movieTimeData, setMovieTimeData] = useState([]);
    const {jwt} = useContext(JwtContext)
    const [deleteMovieTimeId, setDeletedMovieTimeId] = useState("")

    const { loading, error, data, refetch} = useQuery(GET_ALL_MOVIE_TIMES_FULL, {
        variables: {jwt},
        fetchPolicy: 'network-only',
    });

    const [deleteMovieTime] = useMutation(DELETE_MOVIE_TIME, {
        variables: { id: deleteMovieTimeId }
    });


    useEffect(() => {
        setMovieTimeData(data?.getAllMovieTimes || []);
    }, [filteredMovieTimes, data]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const groupedByScreen = movieTimeData.reduce((acc, movieTime) => {
        const screenName = movieTime.screen?.screenName || "Unknown Screen";
        acc[screenName] = acc[screenName] || [];
        acc[screenName].push(movieTime);
        return acc;
    }, {});

    async function handleDeletion() {
        try {
            await deleteMovieTime({
                variables: {
                    jwt: jwt,
                },
            })
            await refetch();
        } catch (error) {
            console.error('Error deleting movie time:', error.message);
        }
    }

    const DeletionMsg = () => (
        <div className="flex flex-col">
            <p>Are you sure you want to delete this movie time?</p>
            <div className="flex flex-row justify-around mt-8">
                <button
                    type="button"
                    onClick={handleDeletion}
                    className="mx-8 rounded-full px-2 py-1 bg-black text-red-500 border-red-500 border-[2px] w-[120px] h-[50px] hover:text-black hover:bg-red-500 font-montserrat font-bold"
                >
                    Delete
                </button>
            </div>
        </div>
    );

    function warnDeletion(movieTimeId) {
        setDeletedMovieTimeId(movieTimeId)
        toast(<DeletionMsg/>, {
            style: {
                width: '400px',
                height: '150px',
            },
        });
    }
    return (
        <div className="text-white mt-20 justify-center flex flex-col items-center">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {Object.entries(groupedByScreen).map(([screenName, movieTimes]) => (
                <div key={screenName} className="text-center">
                    <h2 className="text-[32px] font-playfair cursor-pointer text-secondary"
                        onClick={() => navigate(`/admin-screens`)}>{screenName}</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 ">
                        {movieTimes.map(movieTime => (
                            <li key={movieTime.id} className="p-4 border border-gray-300 rounded">
                                <p className="text-lg font-semibold mb-2 cursor-pointer text-secondary"
                                    onClick={() => navigate(`/admin-movies/edit/${movieTime.movie.id}`)}>{movieTime.movie?.title}</p>
                                <p>Start Time: {formatDate(movieTime.startTime)}</p>
                                <p className="mt-4">Prices</p>
                                <div className="flex flex-row justify-between">
                                    <p className="mx-2">Adult: ${movieTime.adultPrice}</p>
                                    <p className="mx-2">Senior: ${movieTime.seniorPrice}</p>
                                    <p className="mx-2">Child: ${movieTime.childPrice}</p>
                                </div>
                                <div className="flex flex-row mt-4 justify-around">
                                    <button
                                        type="button"
                                        className="rounded-full px-2 py-1 bg-white text-black border-black border-[2px] w-[80px] h-[30px] text-[12px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold"
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => warnDeletion(movieTime.movie.id)}
                                        className="rounded-full px-2 py-1 bg-black text-red-500 border-red-500 border-[2px] w-[80px] h-[30px] text-[12px] hover:bg-red-500 hover:text-black font-montserrat font-bold"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AdminTimesList;