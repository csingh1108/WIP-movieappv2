import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {JwtContext} from "../Context/JwtContext.jsx";
import {useMutation} from "@apollo/client";
import {CREATE_MOVIE} from "../GraphQLQueries/index.jsx";
import {toast, ToastContainer} from "react-toastify";

const AdminCreateMovieHero = () => {
    const {jwt} = useContext(JwtContext)
    const [createMovie] = useMutation(CREATE_MOVIE);
    const [createMovieData, setCreateMovieData] = useState({
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
    const navigate = useNavigate();

    function updateMovieData(field, value) {
        setCreateMovieData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    }

    async function handleSubmitMovie() {
        const isFormValid = Object.values(createMovieData).every((value) => value !== '');

        if (isFormValid && jwt !== null) {
            try {
                await createMovie({
                    variables: {
                        ...createMovieData,
                        jwt: jwt,
                    },
                })

                navigate('/admin-movies');
            } catch (error) {
                console.error('Error creating movie:', error.message);
            }
        } else {
            toast.error('Please fill in all fields', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
    }


    return (
        <div className="flex flex-col font-montserrat text-white justify-center text-center">
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
            <h3 className="font-playfair text-[32px] mb-8">Enter Movie Information</h3>
            <div className="mb-4 text-center">
                <label htmlFor="title" className="block font-montserrat mb-2">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={createMovieData.title}
                    onChange={(e) => updateMovieData("title", e.target.value)}
                    className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md text-black"
                />
            </div>
            <div className="mb-4 text-center">
                <label htmlFor="synopsis" className="block font-montserrat mb-2">Synopsis:</label>
                <textarea
                    id="synopsis"
                    value={createMovieData.synopsis}
                    onChange={(e) => updateMovieData("synopsis", e.target.value)}
                    className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md text-black"
                    rows={5}
                    cols={50}
                />
            </div>
            <div className="flex flex-row justify-center items-center">
                <div className="mb-4 text-center mr-8">
                    <label htmlFor="releaseYear" className="block font-montserrat mb-2">Release Year:</label>
                    <select
                        id="releaseYear"
                        value={createMovieData.releaseYear}
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
                        value={createMovieData.duration}
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
                    value={createMovieData.imgUrl}
                    onChange={(e) => updateMovieData("imgUrl", e.target.value)}
                    className="w-[400px] px-3 py-2 border border-gray-300 rounded-md text-black"
                />
            </div>
            <div className="mb-4 text-center">
                <label htmlFor="videoUrl" className="block font-montserrat mb-2">Video embed URL:</label>
                <input
                    type="text"
                    id="videoUrl"
                    value={createMovieData.videoUrl}
                    onChange={(e) => updateMovieData("videoUrl", e.target.value)}
                    className="w-[400px] px-3 py-2 border border-gray-300 rounded-md text-black"
                />
            </div>

            <div className="flex flex-row justify-center">
                <div className="mb-4 text-center mr-8">
                    <label htmlFor="genre" className="block font-montserrat mb-2">Genre:</label>
                    <select
                        id="genre"
                        value={createMovieData.genre}
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
                <div className="mb-4 text-center mr-8">
                    <label htmlFor="rating" className="block font-montserrat mb-2">Rating:</label>
                    <select
                        id="rating"
                        value={createMovieData.rating}
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
                <div className="mb-4 text-center ml-8">
                    <label htmlFor="isFeatured" className="block font-montserrat mb-2">Featured:</label>
                    <input
                        type="checkbox"
                        id="isFeatured"
                        value={createMovieData.isFeatured}
                        checked={createMovieData.isFeatured}
                        onChange={() => updateMovieData('isFeatured', !createMovieData.isFeatured)}
                        className="w-[100px] border border-gray-300 rounded-md text-black"
                    />
                </div>

            </div>
            <div className="flex justify-center items-center mt-8">
                <button
                    type="button"
                    onClick={handleSubmitMovie}
                    className="mr-8 rounded-full px-2 py-1 bg-white text-black border-black border-[2px] w-[120px] h-[50px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold"
                >
                    Create
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/admin-dashboard")}
                    className="ml-8 rounded-full px-2 py-1 bg-black text-white border-white border-[2px] w-[120px] h-[50px] hover:border-red-500 hover:text-red-500 font-montserrat font-bold"
                >
                    Cancel
                </button>
            </div>


        </div>
    );
};

export default AdminCreateMovieHero;