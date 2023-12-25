import styles from "../style.js";
import {useQuery} from "@apollo/client";
import { GET_MOVIE_BY_ID} from "../GraphQLQueries/index.jsx";
import {formatDuration} from "../Helpers/index.jsx";
import { format } from 'date-fns';
import {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import {MovieContext} from "../Context/MovieContext.jsx";

const MovieDetailsHero = ({ movieID }) => {
    const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
        variables: { id: movieID },
    });
    const {setMovieNameContext, setTicketsContext} = useContext(MovieContext);

    useEffect(() => {
        if (!loading && !error) {
            setMovieNameContext(data.getMovieById.title);
        }
        setTicketsContext({
            adult: 0,
            senior: 0,
            child: 0,
        })
    }, [loading, error, data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const movieData = data.getMovieById;

    const movieTimes = data.getMovieById.movieTimes;

    //Reformat time from local date time to year-month-day hours-minutes am/pm
    const movieTimeDetails = movieTimes.map((movieTime) => {
        const dateObject = new Date(movieTime.startTime);
        return {
            id: movieTime.id,
            date: format(dateObject, 'yyyy-MM-dd'),
            time: format(dateObject, 'h:mm a'),
        };
    });

    //group times by date
    const groupByDate = movieTimeDetails.reduce((groups, movieTime) => {
        if (!groups[movieTime.date]) {
            groups[movieTime.date] = [];
        }
        groups[movieTime.date].push({ time: movieTime.time, id: movieTime.id });
        return groups;
    }, {});

    function getClassNames(isFull) {
        let baseClassNames = "rounded-full px-2 py-1 bg-black border-[2px] border-white text-white w-[120px] h-[50px] mt-3 hover:opacity-75 font-semibold justify-center flex items-center";

        if (isFull) {
            return baseClassNames + " cursor-not-allowed opacity-50";
        }
        return baseClassNames;
    }



    return (
        <div className={`flex flex-col ${styles.paddingY}`}>
            <div className="flex justify-center flex-1 mt-12">
                <iframe
                    className="w-full max-w-screen-xl h-[700px]"
                    src={movieData.videoUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="mt-6 flex md:flex-row flex-col">
                <div className="flex flex-col font-montserrat font-semibold text-[18px] min-w-[30%]">
                    <p className="text-white">{formatDuration(movieData.duration)} | {movieData.rating}</p>
                    <p className="text-white">{movieData.releaseYear}</p>
                    <p className="text-white">{movieData.genre}</p>
                </div>
                <div>
                    <p className="text-white font-montserrat text-[20px] leading-[38px] md:mt-0 mt-6">{movieData.synopsis}</p>
                </div>
            </div>
            <div className="border-b-[1px] mb-12 mt-8" />

            <div className="flex flex-col">
                <h1 className="font-playfair font-bold text-white text-[32px] text-center">Showtimes</h1>
            </div>

            {Object.entries(groupByDate).map(([date, times]) => (
                <div className="flex flex-col mt-12 justify-center items-center" key={date}>
                    <p className="text-[22px] font-playfair text-white font-semibold">
                        {date}
                    </p>
                    <div className="flex md:flex-row flex-col md:space-x-12 mt-4">
                        {times.sort((a, b) => new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time))
                            .map(({ time, id, isFull}) => (
                                <Link
                                    key={id}
                                    to={`/tickets/${id}`}
                                    className={getClassNames(isFull)}
                                    style={{ textDecoration: 'none', color: 'white' }}
                                >
                                    {time}
                                </Link>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MovieDetailsHero;