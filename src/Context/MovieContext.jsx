import { createContext, useState } from 'react';

// Create the context
export const MovieContext = createContext({});

// Create a provider component
export function MovieProvider({ children }) {
    const [movieNameContext, setMovieNameContext] = useState('');

    //This value tracks the actual Seat information (A1, B2, C6 etc.)
    const [pickedSeatsContext, setPickedSeatsContext] = useState([]);

    //Track movieTime as user goes through process of buying a ticket
    const [ movieTimeIdContext, setMovieTimeIdContext] = useState(null)

    //Track prices for specific movie time
    const [pricesContext, setPricesContext] = useState();

    //This value track number of ticket by Type: Adult, Senior, Child
    const [ticketsContext, setTicketsContext] = useState({
        adult: 0,
        senior: 0,
        child: 0,
    });

    //Track email for receipt
    const [emailContext, setEmailContext] = useState('')

    //Track total price;
    const [ totalPriceContext, setTotalPriceContext] = useState(0)

    //Track final booking:
    const [ bookingContext, setBookingContext] = useState();

    const [ paymentStatus, setPaymentStatus] = useState(false);

    return (
        <MovieContext.Provider value={{
            movieNameContext, setMovieNameContext,
            movieTimeIdContext, setMovieTimeIdContext,
            pickedSeatsContext, setPickedSeatsContext,
            pricesContext, setPricesContext,
            ticketsContext, setTicketsContext,
            emailContext, setEmailContext,
            totalPriceContext, setTotalPriceContext,
            bookingContext, setBookingContext,
            paymentStatus, setPaymentStatus
        }}>
            {children}
        </MovieContext.Provider>
    );
}
