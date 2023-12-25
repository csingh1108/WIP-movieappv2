import {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_MOVIE, GET_MOVIE_BY_ID, UPDATE_MOVIE} from "../GraphQLQueries/index.jsx";
import {toast, ToastContainer} from "react-toastify";
import {JwtContext} from "../Context/JwtContext.jsx";

const AdminEditMoviesHero = () => {
    const {movieId} = useParams("movieId")
    const navigate = useNavigate();

    const {loading, error, data} = useQuery(GET_MOVIE_BY_ID, {
        variables: { id: movieId }})

    const [isEditable, setIsEditable] = useState(false);


    const {jwt } = useContext(JwtContext)

    const [updateMovie] = useMutation(UPDATE_MOVIE, {
        variables: { id: movieId }
    });

    const [deleteMovie] = useMutation(DELETE_MOVIE, {
        variables: { id: movieId }
    });

    const [updatedMovieData, setUpdatedMovieData] = useState({
        title: "",
        synopsis: "",
        releaseYear: "",
        duration: "",
        imgUrl: "",
        videoUrl: "",
        rating: "",
        genre: "",
        isFeatured: false
    })

    useEffect(() => {
        if(data !=null){
            setUpdatedMovieData({
                title: data.getMovieById.title,
                synopsis: data.getMovieById.synopsis,
                releaseYear: data.getMovieById.releaseYear,
                duration: data.getMovieById.duration,
                imgUrl: data.getMovieById.imgUrl,
                videoUrl: data.getMovieById.videoUrl,
                rating: data.getMovieById.rating,
                genre: data.getMovieById.genre,
                isFeatured: data.getMovieById.isFeatured
            })
        }
    }, [data]);


    function updateMovieData(field, value) {
        setUpdatedMovieData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    }

    async function handleSubmitMovie() {
        try {
            await updateMovie({
                variables: {
                    ...updatedMovieData,
                    jwt: jwt,
                },
            })

            navigate('/admin-movies');
        } catch (error) {
            console.error('Error deleting movie:', error.message);
        }
    }

    const DeletionMsg = ({ closeToast, toastProps }) => (
        <div className="flex flex-col">
            <p>Are you sure you want to delete this movie?</p>
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

    async function handleDeletion() {
        try {
            await deleteMovie({
                variables: {
                    jwt: jwt,
                },
            })
            navigate('/admin-movieTimes');
        } catch (error) {
            console.error('Error deleting movie:', error.message);
        }
    }

    function warnDeletion() {
        toast(<DeletionMsg/>, {
            style: {
                width: '400px',
                height: '150px',
            },
        });
    }

    const handleEditToggle = () => {
        setIsEditable((prevValue) => !prevValue);
    };


    return (
        <div className="flex flex-col font-montserrat text-white justify-center text-center mt-16">
            <ToastContainer
                position="top-center"
                autoClose={20000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <h3 className="font-playfair text-[32px] mb-8">Movie Information</h3>
            {isEditable ? (
                <>
                    <div className="mb-4 text-center">
                        <label htmlFor="title" className="block font-montserrat mb-2">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={updatedMovieData.title}
                            onChange={(e) => updateMovieData("title", e.target.value)}
                            className="sm:w-[700px] w-[300px] px-3 py-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>

                    <div className="mb-4 text-center">
                        <label htmlFor="synopsis" className="block font-montserrat mb-2">Synopsis:</label>
                        <textarea
                            id="synopsis"
                            value={updatedMovieData.synopsis}
                            onChange={(e) => updateMovieData("synopsis", e.target.value)}
                            className="sm:w-[700px] w-[300px] px-3 py-2 border border-gray-300 rounded-md text-black"
                            rows={5}
                            cols={50}
                        />
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <div className="mb-4 text-center mr-8">
                            <label htmlFor="releaseYear" className="block font-montserrat mb-2">Release Year:</label>
                            <select
                                id="releaseYear"
                                value={updatedMovieData.releaseYear}
                                onChange={(e) => updateMovieData("releaseYear", e.target.value)}
                                className="w-[150px] h-[42px] px-3 py-2 border border-gray-300 rounded-md text-black"
                            >
                                <option value="">Select a year</option>
                                {Array.from({length: 100}, (_, index) => {
                                    const year = 2023 - index;
                                    return <option key={year} value={year}>{year}</option>;
                                })}
                            </select>
                        </div>
                        <div className="mb-4 text-center ml-8">
                            <label htmlFor="duration" className="block font-montserrat mb-2">Duration:</label>
                            <input
                                type="number"
                                id="duration"
                                value={updatedMovieData.duration}
                                onChange={(e) => updateMovieData("duration", e.target.value)}
                                className="w-[100px] px-3 py-2 border border-gray-300 rounded-md text-black"
                            />
                        </div>
                    </div>
                    <div className="mb-4 text-center">
                        <label htmlFor="imgUrl" className="block font-montserrat mb-2">ImgURL:</label>
                        <input
                            type="text"
                            id="imgUrl"
                            value={updatedMovieData.imgUrl}
                            onChange={(e) => updateMovieData("imgUrl", e.target.value)}
                            className="sm:w-[700px] w-[300px] px-3 py-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>
                    <div className="mb-4 text-center">
                        <label htmlFor="videoUrl" className="block font-montserrat mb-2">Video embed URL:</label>
                        <input
                            type="text"
                            id="videoUrl"
                            value={updatedMovieData.videoUrl}
                            onChange={(e) => updateMovieData("videoUrl", e.target.value)}
                            className="sm:w-[700px] w-[300px] px-3 py-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>

                    <div className="flex sm:flex-row flex-col justify-center">
                        <div className="mb-4 text-center sm:mr-8">
                            <label htmlFor="genre" className="block font-montserrat mb-2">Genre:</label>
                            <select
                                id="genre"
                                value={updatedMovieData.genre}
                                onChange={(e) => updateMovieData("genre", e.target.value)}
                                className="w-[200px] h-[42px] px-3 py-2 border border-gray-300 rounded-md text-black"
                            >
                                <option value="">Select a genre</option>
                                <option value="Horror">Horror</option>
                                <option value="Action">Action</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Drama">Drama</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Romance">Romance</option>

                            </select>
                        </div>
                        <div className="mb-4 text-center sm:mr-8">
                            <label htmlFor="rating" className="block font-montserrat mb-2">Rating:</label>
                            <select
                                id="rating"
                                value={updatedMovieData.rating}
                                onChange={(e) => updateMovieData("rating", e.target.value)}
                                className="w-[150px] h-[42px] px-3 py-2 border border-gray-300 rounded-md text-black"
                            >
                                <option value="">Select a year</option>
                                <option value="G">G</option>
                                <option value="PG">PG</option>
                                <option value="PG-13">PG-13</option>
                                <option value="R">R</option>
                                <option value="NC-17">NC-17</option>

                            </select>
                        </div>
                        <div className="mb-4 text-center sm:ml-8">
                            <label htmlFor="isFeatured" className="block font-montserrat mb-2">Featured:</label>
                            <input
                                type="checkbox"
                                id="isFeatured"
                                value={updatedMovieData.isFeatured}
                                checked={updatedMovieData.isFeatured}
                                onChange={() => updateMovieData('isFeatured', !updatedMovieData.isFeatured)}
                                className="w-[100px] border border-gray-300 rounded-md text-black"
                            />
                        </div>

                    </div>
                    <div className="flex justify-center items-center mt-8 mb-16">
                        <button
                            type="button"
                            onClick={handleSubmitMovie}
                            className="mx-8 rounded-full px-2 py-1 bg-white text-black border-black border-[2px] w-[120px] h-[50px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={handleEditToggle}
                            className="mx-8 rounded-full px-2 py-1 bg-black text-white border-white border-[2px] w-[120px] h-[50px] hover:border-red-500 hover:text-red-500 font-montserrat font-bold"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={warnDeletion}
                            className="mx-8 rounded-full px-2 py-1 bg-black text-red-500 border-red-500 border-[2px] w-[120px] h-[50px] hover:bg-red-500 hover:text-black font-montserrat font-bold"
                        >
                            Delete
                        </button>
                    </div>
                </>) : (
                <div className="font-montserrat flex justify-center text-center items-center flex-col">
                    <h4>Title</h4>
                    <p>{updatedMovieData.title}</p>
                    <h4 className="mt-8">Synopsis</h4>
                    <p className="mt-2 w-[700px]">{updatedMovieData.synopsis}</p>
                    <div className="flex flex-row mt-8">
                        <h4>Release Year:&nbsp;</h4>
                        <p className="mr-8">{updatedMovieData.releaseYear}</p>
                        <h4>Duration:&nbsp;</h4>
                        <p className="">{updatedMovieData.duration}</p>
                    </div>

                    <h4 className="mt-8">ImgURL</h4>
                    <p className="mt-2">{updatedMovieData.imgUrl}</p>
                    <h4 className="mt-8">Video embed URL</h4>
                    <p className="mt-2">{updatedMovieData.videoUrl}</p>
                    <div className="flex flex-row mt-4">
                        <h4>Genre:&nbsp;</h4>
                        <p className="mr-8">{updatedMovieData.genre}</p>
                        <h4>Rating:&nbsp;</h4>
                        <p className="mr-8">{updatedMovieData.rating}</p>
                        <h4>Featured:&nbsp;</h4>
                        <p className="mx-r">{updatedMovieData.isFeatured ? "Yes" : "No"}</p>
                    </div>
                </div>
            )}
            <div className="flex justify-center items-center mt-8">
                <button
                    type="button"
                    onClick={handleEditToggle}
                    className="mx-8 rounded-full px-2 py-1 bg-black text-white border-white border-[2px] w-[120px] h-[50px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold"
                >
                    {isEditable ? "Save" : "Edit"}
                </button>
            </div>

        </div>
    )
}


export default AdminEditMoviesHero;