import { useQuery } from '@apollo/client';
import styles from "../style.js";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {BiLeftArrow, BiRightArrow} from "react-icons/bi";
import {GET_ALL_FEATURED_MOVIES} from "../GraphQLQueries";
import {useNavigate} from "react-router-dom";
import {formatDuration} from "../Helpers/index.jsx";

function NextArrow(props) {
    const { onClick } = props;
    return (
        <i className="text-white hover:text-secondary cursor-pointer arrow-right" style={{backgroundImage:"none"}} onClick={onClick}>
           <BiRightArrow className="w-[30px] h-[30px] transition-all duration-300 hover:scale-125"/>
        </i>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <i className="text-white hover:text-secondary cursor-pointer arrow-left" style={{backgroundImage:"none"}} onClick={onClick}>
            <BiLeftArrow className="w-[30px] h-[30px] transition-all duration-300 hover:scale-125"/>
        </i>
    );
}

const FeaturedSlide = () => {
    const navigate = useNavigate();

    var settings = {
        infinite: true,
        speed: 750,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        centerMode: true,
        centerPadding: "20px",
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
        ]
    };

    const { loading, error, data } = useQuery(GET_ALL_FEATURED_MOVIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;



    return (
        <section id="home" className={`flex flex-col ${styles.paddingY} sm:mt-0 mt-12`}>
            <h1 className="text-white font-playfair font-bold text-[32px] mb-2">Featured Movies</h1>
            <div className="border-b-[1px] mb-12 w-80%" />
            <div className="text-center featured__content sm:mt-0 mt-6">
                <Slider {...settings}>
                    {data.getAllMovies.filter(movie => movie.isFeatured).map((movie) => (
                        <div
                            key={movie.id+movie.title}
                            className={`flex justify-center items-center`}
                        >
                            <img
                                src={movie.imgUrl}
                                alt={`movie poster for ${movie.title}`}
                                className={`lg:w-[310px] w-[200px] h-[475px] my-0 mx-auto`}
                            />
                            <div className="flex flex-col mt-3 justify-center items-center">
                                <h1 className="text-white font-montserrat font-semibold w-[300px] ">{movie.title}</h1>
                                <p className="text-dimWhite font-montserrat">{formatDuration(movie.duration)} | PG-13 </p>
                                <p className="text-dimWhite font-montserrat text-[13px]">Released {movie.releaseYear} </p>
                                <button
                                    type="button"
                                    onClick={() => navigate(`/movie-details/${movie.id}`)}
                                    className="rounded-full px-2 py-1 bg-red-700 text-white w-[150px] h-[40px] mx-auto mt-3 hover:opacity-75"
                                >
                                    Get Tickets
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default FeaturedSlide;