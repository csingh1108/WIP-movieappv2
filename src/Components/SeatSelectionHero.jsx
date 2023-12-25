import React, {useContext, useEffect, useState} from 'react';
import {useApolloClient, useMutation, useQuery} from "@apollo/client";
import {
    CREATE_SEATS,
    GET_MOVIE_TIME_RESERVED_SEATS_BY_ID,
} from "../GraphQLQueries/index.jsx";
import {MovieContext} from "../Context/MovieContext.jsx";
import {useNavigate} from "react-router-dom";

const SeatSelectionHero = ({ numOfTickets, showingId }) => {
    const [ticketsRemaining, setTicketsRemaining] = useState(0);
    const [pickedSeats, setPickedSeats] = useState([]);
    const navigate = useNavigate();
    const {pickedSeatsContext,setPickedSeatsContext}  = useContext(MovieContext);
    const client = useApolloClient();
    const [showAlert, setShowAlert] = useState(false);
    const [truncatedErrorMessage, setTruncatedErrorMessage] = useState("");


    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const columnCounts = [8, 8, 8, 8, 9, 10, 10, 10, 10, 11, 11];

    useEffect(() => {
        if (pickedSeats.length > 0) {
            setTicketsRemaining(numOfTickets - pickedSeats.length);
        } else {
            setTicketsRemaining(numOfTickets);
        }
    }, [numOfTickets, pickedSeats]);

    // Assign Labels for each Seat
    const seatLabelsPerRow = rows.map((row, rowIndex) =>
        Array.from({ length: columnCounts[rowIndex] }, (_, columnIndex) =>
            `${row}${columnIndex + 1}`
        )
    );

    // Set all seats to open
    const initialSeats = seatLabelsPerRow
        .flat()
        .map(seat => ({ label: seat, status: 'open' }));

    const [seats, setSeats] = useState(initialSeats);

    // Change color of seat based on status
    const getColor = (status) => {
        switch (status) {
            case 'picked':
                return 'bg-secondary';
            case 'reserved':
                return 'bg-gray-500';
            default:
                return 'bg-green-600';
        }
    };

    const { loading, error, data } = useQuery(GET_MOVIE_TIME_RESERVED_SEATS_BY_ID, {
        variables: { id: showingId },
    });

    const refetchSeatsData = async () => {
        try {
            const { data: refetchedData } = await client.query({
                query: GET_MOVIE_TIME_RESERVED_SEATS_BY_ID,
                variables: { id: showingId },
                fetchPolicy: 'network-only',
            });

            // Extract reserved seat names into an array
            const reservedSeats = refetchedData.getMovieTimeById.reservedSeats.map(seat => seat.seatName);

            // Update the state of seats
            const updatedSeats = seats.map(seat => {
                if (pickedSeatsContext && pickedSeatsContext.includes(seat.label)) {
                    return { ...seat, status: 'picked' };
                } else if (reservedSeats.includes(seat.label)) {
                    return { ...seat, status: 'reserved' };
                }
                return seat;
            });
            setSeats(updatedSeats);
        } catch (refetchError) {
            console.error("Failed to refetch seat data:", refetchError);
        }
    };

    const goToConfirm = async () => {
        setPickedSeatsContext(pickedSeats);
        try {
            const { data: refetchedData } = await client.query({
                query: GET_MOVIE_TIME_RESERVED_SEATS_BY_ID,
                variables: { id: showingId },
                fetchPolicy: 'network-only',
            });

            // Check if any refetched data matches any seat in pickedSeatsContext
            const reservedSeats = refetchedData.getMovieTimeById.reservedSeats.map(seat => seat.seatName);
            const conflictingSeats = pickedSeatsContext && pickedSeatsContext.filter(seat => reservedSeats.includes(seat));


            if (conflictingSeats.length > 0) {
                // Set the error message and invoke refetchSeatsData
                const errorMessage = `${conflictingSeats.join(', ')} has been reserved.`;
                setPickedSeatsContext([])
                setTruncatedErrorMessage(errorMessage);
                setShowAlert(true);
                await refetchSeatsData();
            } else {
                navigate("/confirm");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAlertClose = () => {
        setShowAlert(false);

        // Update the state of seats after the alert is closed
        const updatedSeats = seats.map(seat => {
            if (pickedSeats.includes(seat.label)) {
                return { ...seat, status: 'reserved' };
            }
            return seat;
        });
        setSeats(updatedSeats);
    };

    useEffect(() => {
        // Initial fetch of seat data
        refetchSeatsData();
        return () => {
        };
    }, [showingId, ]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // Handle seat clicks and update picked seats array as well as the seat grid.
    const handleSeatClick = (seatLabel) => {
        // Use the callback function of setSeats to perform actions after the state update
        setSeats((prevSeats) => {
            return prevSeats.map((seat) => {
                if (seat.label === seatLabel) {
                    if (seat.status === 'open' && ticketsRemaining > 0) {
                        // Seat is open and there are remaining tickets, pick it
                        setPickedSeats((prev) => [...prev, seatLabel]);
                        setTicketsRemaining((prev) => prev - 1); // Decrement remaining tickets
                        return { ...seat, status: 'picked' };
                    } else if (seat.status === 'picked') {
                        // Seat is picked, remove it
                        setPickedSeats((prev) => prev.filter((label) => label !== seatLabel));
                        setTicketsRemaining((prev) => prev + 1); // Increment remaining tickets
                        return { ...seat, status: 'open' };

                    }
                }
                return seat;
            });
        });
    };

    return (
        <section
            id="seating"
            className="flex flex-col items-center overflow-hidden h-screen mt-12"
        >
            <div className="w-[56vw] h-[50px] bg-gray-400 mb-8 flex items-center justify-center mt-11">
                <h1 className="font-montserrat text-[24px] text-center">Screen</h1>
            </div>
            {seatLabelsPerRow.map((seatLabels, index) => (
                <div
                    key={index}
                    className={`grid mb-1 grid-container ${index === 4 || index === 8 ? 'mt-8' : 'mt-2'}`}
                    style={{
                        gridTemplateColumns: `repeat(${columnCounts[index]}, minmax(1vw, 2vw)`,
                    }}
                >
                    {seatLabels.map(seatLabel => {
                        const { status } = seats.find(seat => seat.label === seatLabel) || {};
                        return (
                            <div key={seatLabel}
                                 onClick={() => handleSeatClick(seatLabel)}
                                 className={`cursor-pointer border-[1px] rounded-t-[10px] border-white p-3 w-[4vw] h-[5vh] ${getColor(status)}`}>
                                <p className="text-white font-montserrat font-semibold flex justify-center items-center select-none">
                                    {seatLabel}
                                </p>
                            </div>
                        );
                    })}
                </div>
            ))}
                <div className="flex sm:flex-row flex-col items-center justify-around w-full mt-4 mb-8">
                    <p className="text-dimWhite font-montserrat text-[20px] mt-3">
                        Tickets remaining: {ticketsRemaining}{' '}
                    </p>
                    {ticketsRemaining === 0 ? (
                        <div className="mt-3 text-center text-[16px]">
                            <button
                                type="button"
                                onClick={goToConfirm}
                                className="rounded-full px-2 py-1 bg-black text-white border-white border-[2px] w-[120px] h-[50px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold "
                            >
                                Continue
                            </button>
                        </div>
                    ) : (
                        <div className="w-[120px] h-[65px]"></div>
                    )}
                </div>
            {showAlert && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-md">
                        <p>{truncatedErrorMessage}</p>
                        <button onClick={handleAlertClose}>Close</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SeatSelectionHero;