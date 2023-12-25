import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_MOVIES } from "../GraphQLQueries/index.jsx";

const MoviesList = () => {
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);

    const { loading, error, data } = useQuery(GET_ALL_MOVIES);

    const [hoveredMovie, setHoveredMovie] = useState(null);

    const handleMovieHover = (movie) => {
        setHoveredMovie(movie);
    };

    const closeFilter = () => {
        setShowFilter((prevShowFilter) => !prevShowFilter);
    };

    const openFilter = () => {
        setShowFilter((prevShowFilter) => !prevShowFilter);
    };

    function handleNavigate(id) {
        navigate(`/movie-details/${id}`);
        window.scrollTo(0, 0);
    }

    return (
        <section id="movies-list" className="flex flex-col relative">
            <div className="text-end mt-12 relative z-3">
                <button
                    className={`text-white font-montserrat border-[1px] rounded-full px-6 py-2 ${
                        showFilter
                            ? 'hover:text-red-400 hover:border-red-600'
                            : 'hover:text-sky-400 hover:border-sky-400'
                    }`}
                    onClick={showFilter ? closeFilter : openFilter}
                    style={{zIndex: 3}}
                >
                    {showFilter ? 'Close' : 'Filter'}
                </button>

            </div>
            {
                showFilter && (
                    <div
                        className="flex flex-col items-center bg-dimWhite rounded-[10px] p-4 mt-4 mb-4"
                    >
                        <p className="text-black">Filter Options</p>
                    </div>
                )
            }
            <div className="flex-flex-col">
                <h1 className="font-playfair text-white font-bold text-[32px] mb-2">
                    Popular Movies
                </h1>
                <div className="border-b-[1px] border-b-white mb-12 w-80%"/>
            </div>
            <div
                className="lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 grid mb-10"
            >
                {data &&
                    data.getAllMovies &&
                    data.getAllMovies.map((movie, index) => (
                        <div
                            key={index}
                            className="flex flex-col text-center mt-5 relative"
                            onMouseEnter={() => handleMovieHover(movie)}
                            onMouseLeave={() => handleMovieHover(null)}
                        >
                            {hoveredMovie && hoveredMovie.id === movie.id && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                        backgroundImage: `url(${movie.imgUrl})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        filter: "blur(100px)",
                                        zIndex: 1,
                                        transition: "filter 0.5s ease-in-out",
                                    }}
                                ></div>
                            )}
                            <img
                                src={movie.imgUrl}
                                className="w-[230px] h-[330px] mx-auto cursor-pointer border-black border-[1px] hover:scale-105 transition-all duration-300 z-[1]"
                                alt={`${movie.title}-img`}
                                onClick={() => handleNavigate(movie.id)}
                            />
                            <div className="flex flex-col bg-dimWhite w-[230px] h-[170px] mx-auto rounded-[10px] mt-2 justify-center z-[1] ">
                                <p className="font-montserrat text-black font-semibold text-[20px] mt-2">
                                    {movie.title}
                                </p>
                                <p className="font-montserrat text-black font-semibold text-[16px] mt-1">
                                    {movie.genre} | Released: {movie.releaseYear}
                                </p>
                                <p className="font-montserrat text-black font-semibold text-[16px] mt-1">
                                    Rated: {movie.rating} | {movie.duration} minutes
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default MoviesList;




