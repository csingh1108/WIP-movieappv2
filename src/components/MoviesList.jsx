import { useState } from "react";
import { duneHeadImage, oppenHeadImage } from "../assets/index.js";
import {navLinks} from "../constants/index.js";
import {useNavigate} from "react-router-dom";

const MoviesList = () => {
    const navigate= useNavigate();
    const initialBackgroundImage = duneHeadImage;
    const [hoveredImage, setHoveredImage] = useState(initialBackgroundImage);
    const [showFilter, setShowFilter] = useState(false);

    const handleImageHover = (image) => {
        setHoveredImage(image);
    };

    const closeFilter = () => {
        setShowFilter((prevShowFilter) => !prevShowFilter);
    };

    const openFilter = () => {
        setShowFilter((prevShowFilter) => !prevShowFilter);
    };

    const gridContainerStyle = {
        position: "relative",
    };

    const backgroundOverlayStyle = {
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        backgroundImage: hoveredImage ? `url(${hoveredImage})` : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        filter: "blur(50px)",
        zIndex: 1,
        transition: "background-image 0.5s ease-in-out, filter 0.5s ease-in-out",
        width: "150%",
        left: "-20%",
        boxShadow: "inset 0 0 50px 30px rgba(0, 0, 0, 1)",
    };



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
                    style={{ zIndex: 3 }}
                >
                    {showFilter ? 'Close' : 'Filter'}
                </button>

            </div>
            {showFilter && (
                <div
                    className="flex flex-col items-center bg-dimWhite rounded-[10px] p-4 mt-4 mb-4"
                >
                    <p className="text-black">Filter Options</p>
                </div>
                )}
            <div className="flex-flex-col">
                <h1 className="font-playfair text-white font-bold text-[32px] mb-2">
                    Popular Movies
                </h1>
                <div className="border-b-[1px] border-b-white mb-12 w-80%" />
            </div>
            <div
                className="lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 grid mb-10"
                style={gridContainerStyle}
            >
                <div className="background-overlay" style={backgroundOverlayStyle}></div>
                {[
                    { image: duneHeadImage, movieId:1,  title: "Dune (2021)", tag: "Action", year: "2021", rating: "PG", duration: "160 minutes" },
                    { image: oppenHeadImage, movieId:2, title: "Oppenheimer", tag: "Adventure", year: "2023", rating: "PG", duration: "160 minutes" },
                ].map((movie, index) => (
                    <div
                        key={index}
                        className="flex flex-col text-center mt-5 z-[1] "
                        onMouseEnter={() => handleImageHover(movie.image)}
                    >
                        <img
                            src={movie.image}
                            className="w-[230px] h-[330px] mx-auto cursor-pointer border-black border-[1px] hover:scale-105 transition-all duration-300"
                            alt={`${movie.title}-img`}
                            onClick={() => navigate(`/movie-details/${movie.movieId}`)}
                        />
                        <div className="flex flex-col bg-dimWhite w-[230px] mx-auto rounded-[10px] mt-2">
                            <p className="font-montserrat text-black font-semibold text-[20px] mt-2">{movie.title}</p>
                            <p className="font-montserrat text-black font-semibold text-[16px] mt-1">{movie.tag} | Released: {movie.year}</p>
                            <p className="font-montserrat text-black font-semibold text-[16px] mt-1">Rated: {movie.rating} | {movie.duration}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MoviesList;
