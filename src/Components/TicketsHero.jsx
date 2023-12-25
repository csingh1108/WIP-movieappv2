
import {useState, useEffect, useContext} from 'react';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_FEATURED_MOVIES, GET_MOVIE_BY_ID, GET_MOVIE_TIME_PRICES_BY_ID} from "../GraphQLQueries/index.jsx";
import {MovieContext} from "../Context/MovieContext.jsx";
import {useNavigate} from "react-router-dom";

const TicketCounter = ({ showingId  }) => {
    const { setPricesContext, setTicketsContext, ticketsContext, setPickedSeatsContext}  = useContext(MovieContext);
    const navigate = useNavigate();
    const [ title, setTitle ] = useState();
    const [imgUrl, setImgUrl ] = useState();

    const [tickets, setTickets] = useState({
        adult: 0,
        senior: 0,
        child: 0,
    });

    const { loading, error, data } = useQuery(GET_MOVIE_TIME_PRICES_BY_ID, {
        variables: { id: showingId },
    });

    const [prices, setPrices] = useState({
        adult: null,
        senior: null,
        child: null,
    });


    useEffect(() => {
        if (!loading && data) {
            setPrices({
                adult: `$${data.getMovieTimeById.adultPrice.toFixed(2)}`,
                senior: `$${data.getMovieTimeById.seniorPrice.toFixed(2)}`,
                child: `$${data.getMovieTimeById.childPrice.toFixed(2)}`,
            });
            setImgUrl(data.getMovieTimeById.movie.imgUrl)
            setTitle(data.getMovieTimeById.movie.title)
            setTickets(ticketsContext)
        }
    }, [loading, data,ticketsContext]);

    const increment = (type) => {
        setTickets((prevTickets) => ({
            ...prevTickets,
            [type]: prevTickets[type] + 1
        }));
    };

    const decrement = (type) => {
        setTickets((prevTickets) => ({
            ...prevTickets,
            [type]: Math.max(prevTickets[type] - 1, 0)
        }));
    };

    const areAnyTicketsSelected = tickets && Object.values(tickets).some((quantity) => quantity > 0);

    function goToSeating() {
        setPricesContext(prices);
        setTicketsContext(tickets);
        setPickedSeatsContext([]);
        navigate(`/seating/${showingId}`);
    }

    return (
        <>
            <div className="flex flex-col items-center h-screen justify-center">
                <div className="flex sm:flex-row flex-col items-center justify-center sm:mt-[-20px] mt-8 mb-12">
                    <img
                        src={imgUrl}
                        alt={`movie poster for ${title}`}
                        className={`sm:w-[150px] w-[175px] h-[150px] object-contain`}
                    />
                    <h4 className="font-playfair text-[16px] mb-[10px] sm:text-left text-center text-dimWhite">{title}</h4>
                </div>
                <div className="flex flex-col items-center font-montserrat sm:text-[24px] text-[28px] text-white">
                    <h4 className="font-playfair text-[36px] mb-[10px] text-center text-secondary">Purchase Tickets</h4>
                    <div className="flex flex-col items-center space-y-1">
                        <div className="flex justify-center space-x-[20px]">
                            <button type="button" onClick={() => increment('adult')}>
                                <FaRegPlusSquare className="sm:w-[28px] sm:h-[28px] w-[32px] h-[32px]"/>
                            </button>
                            <button type="button" onClick={() => decrement('adult')}>
                                <FaRegMinusSquare className="sm:w-[28px] sm:h-[28px] w-[32px] h-[32px]"/>
                            </button>
                        </div>
                        <div className="flex sm:flex-row flex-col">
                    <span className={`${tickets.adult > 0 ? 'text-secondary' : ''}`}>
                        {tickets.adult} Adult Ticket(s)
                    </span>
                            <span className="text-center"> - {prices.adult} ea. </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-1 mt-4">
                        <div className="flex justify-center space-x-[20px]">
                            <button type="button" onClick={() => increment('senior')}>
                                <FaRegPlusSquare className="sm:w-[28px] sm:h-[28px] w-[32px] h-[32px]"/>
                            </button>
                            <button type="button" onClick={() => decrement('senior')}>
                                <FaRegMinusSquare className="sm:w-[28px] sm:h-[28px] w-[32px] h-[32px]"/>
                            </button>
                        </div>
                        <div className="flex sm:flex-row flex-col">
                    <span className={`${tickets.senior > 0 ? 'text-secondary' : ''}`}>
                        {tickets.senior} Senior Ticket(s)
                    </span>
                            <span className="text-center">- {prices.senior} ea </span>
                        </div>
                        <span className="text-center italic text-[14px]"> Ages 60+ </span>
                    </div>

                    <div className="flex flex-col items-center space-y-1 mt-4">
                        <div className="flex justify-center space-x-[20px]">
                            <button type="button" onClick={() => increment('child')}>
                                <FaRegPlusSquare className="sm:w-[28px] sm:h-[28px] w-[32px] h-[32px]"/>
                            </button>
                            <button type="button" onClick={() => decrement('child')}>
                                <FaRegMinusSquare className="sm:w-[28px] sm:h-[28px] w-[32px] h-[32px]"/>
                            </button>
                        </div>
                        <div className="flex sm:flex-row flex-col">
                    <span className={`${tickets.child > 0 ? 'text-secondary' : ''}`}>
                        {tickets.child} Child Ticket(s)
                    </span>
                            <span className="text-center">- {prices.child} ea </span>
                        </div>
                        <span className="text-center italic text-[14px]"> Ages 2-16 </span>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={goToSeating}
                    className={`rounded-full px-2 py-1 bg-black text-white border-white border-[2px] w-[120px] h-[50px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold mt-12 ${
                        !areAnyTicketsSelected ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={!areAnyTicketsSelected}
                >
                    Continue
                </button>
            </div>
        </>
    );
};

export default TicketCounter;
