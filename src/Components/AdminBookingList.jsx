import {useContext, useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import React from "react";
import PropTypes from "prop-types";
import {JwtContext} from "../Context/JwtContext.jsx";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_BOOKING, GET_ALL_BOOKINGS} from "../GraphQLQueries/index.jsx";
import {useNavigate} from "react-router-dom";

const AdminBookingList = ({filteredBookings}) => {
    AdminBookingList.propTypes = {
        filteredBookings: PropTypes.shape({
            searchBooking: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string.isRequired,
                emailAddress: PropTypes.string.isRequired,
                totalPrice: PropTypes.string.isRequired,
                userId: PropTypes.string,
                createdDate: PropTypes.string,
                pickedSeats: PropTypes.arrayOf(PropTypes.string).isRequired,
            })),
        }),
    };
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState([]);
    const {jwt} = useContext(JwtContext)
    const [deleteBookingId, setDeleteBookingId] = useState("")

    const { loading, error, data, refetch} = useQuery(GET_ALL_BOOKINGS, {
        variables: {jwt},
        fetchPolicy: 'network-only',
    });

    const [deleteBooking] = useMutation(DELETE_BOOKING, {
        variables: { id: deleteBookingId }
    });

    useEffect(() => {
        if (!filteredBookings) {
            setBookingData( (data?.getAllBookings || []));
        } else if (filteredBookings && Array.isArray(filteredBookings.searchBookings)) {
            setBookingData(filteredBookings.searchBookings);
        }
    }, [filteredBookings, data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    async function handleDeletion() {
        try {
            await deleteBooking({
                variables: {
                    jwt: jwt,
                },
            })
            await refetch();
        } catch (error) {
            console.error('Error deleting movie:', error.message);
        }
    }

    const DeletionMsg = () => (
        <div className="flex flex-col">
            <p>Are you sure you want to delete this user?</p>
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

    function warnDeletion(userId) {
        setDeleteBookingId(userId)
        toast(<DeletionMsg/>, {
            style: {
                width: '400px',
                height: '150px',
            },
        });
    }
    return (
        <>
            <div className="mt-12 overflow-auto" style={{maxHeight: "600px"}}>
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
                <table
                    className="text-white w-full text-center border-separate border-spacing-y-4 bg-gray-950 p-6 ">
                    <thead className="border-[1px] border-white text-[20px]">
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Movie</th>
                        <th>Start Time</th>
                        <th>Screen Name</th>
                        <th>Seats</th>
                        <th>Total Payment</th>
                        <th>Bought on</th>
                        <th>Delete</th>
                    </tr>
                    </thead>

                    <tbody>
                    {bookingData.map((booking, index) => (
                        <React.Fragment key={booking.id + booking.createdDate}>
                            <tr className="space-2 font-semibold">
                                <td>{index + 1}</td>
                                <td>{booking.emailAddress}</td>
                                <td className="hover:text-sky-400 cursor-pointer text-secondary"
                                    onClick={() => navigate(`/admin-movies/edit/${booking.movieTime.movie.id}`)}>{booking.movieTime.movie.title}</td>
                                <td>{new Date(booking.movieTime.startTime).toLocaleString()}</td>
                                <td>{booking.movieTime.screen.screenName}</td>
                                <td>{booking.pickedSeats.map(seat => seat.seatName).join(', ')}</td>
                                <td>${booking.totalPrice}</td>
                                <td>{booking.createdDate}</td>
                                <td>
                                    <div className="flex justify-center items-center text-center">
                                        <button
                                            className="border-[1px] border-gray-950 hover:border-white w-[40px] h-[40px] bg-red-600 rounded-[10px] text-[20px] font-bold"
                                            onClick={() => warnDeletion(booking.id)}
                                        >
                                            X
                                        </button>

                                    </div>
                                </td>


                            </tr>
                            {index < bookingData.length - 1 && (
                                <tr>
                                    <td colSpan="8">
                                        <div className="border-b-[1px] border-dimWhite w-full"/>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminBookingList;