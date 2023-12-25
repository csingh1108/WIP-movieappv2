import  {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {MovieContext} from "../Context/MovieContext.jsx";
import {useMutation} from "@apollo/client";
import {CREATE_BOOKING} from "../GraphQLQueries/index.jsx";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentHero = () => {
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState('4123 1233 1113 3124');
    const [expiryMonth, setExpiryMonth] = useState('11');
    const [expiryYear, setExpiryYear] = useState('2079');
    const [cvc, setCvc] = useState('001');
    const [email, setEmail] = useState('text@example.com');
    const [createBookingMutation] = useMutation(CREATE_BOOKING);

    const { setEmailContext, movieTimeIdContext,pickedSeatsContext, totalPriceContext, setPickedSeatsContext, setBookingContext } = useContext(MovieContext);

    async function handlePay() {
        try {
            const result = await createBookingMutation({
                variables: {
                    movieTimeId: movieTimeIdContext,
                    emailAddress: email,
                    pickedSeats: pickedSeatsContext,
                    totalPrice: totalPriceContext,
                    userId: '',
                },
            });

            const createdBooking = result.data.createBooking;

            setEmailContext(email);
            setBookingContext(createdBooking);
            navigate("/receipt")
        } catch (error) {
            toast.error(`Error creating booking: ${error.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                onClose: () => navigate(`/seating/${movieTimeIdContext}`)
            });
            setPickedSeatsContext();
        }
    }


    return (
        <div className="mt-12">
            <div className="text-red-600 text-center mt-5 font-bold">
                <p>This page is for example purposes. Simply enter RANDOM infomation and click pay.</p>
                <p>DO NOT ENTER REAL CARD DATA</p>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Card Payment</h2>

            <div className="mb-4 text-center">
                <label htmlFor="cardNumber" className="block text-white font-montserrat mb-2">Card Number:</label>
                <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter card number..."
                />
            </div>

            <div className="mb-4 text-center">
                <label htmlFor="expiryDate" className="block text-white font-montserrat mb-2">Expiry Date:</label>
                <div className="flex flex-row text-center justify-center">
                    <select
                        value={expiryMonth}
                        onChange={(e) => setExpiryMonth(e.target.value)}
                        className="sm:w-[200px] w-[150px] px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">MM</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                        ))}
                    </select>
                    <select
                        value={expiryYear}
                        onChange={(e) => setExpiryYear(e.target.value)}
                        className="sm:w-[200px] w-[150px] ml-2 px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">YYYY</option>
                        {[...Array(21)].map((_, i) => (
                            <option key={i + 1}
                                    value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4 text-center">
                <label htmlFor="cvc" className="block font-montserrat text-white mb-2">CVC:</label>
                <input
                    type="number"
                    id="cvc"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4 text-center">
                <label htmlFor="email" className="block font-montserrat text-white mb-2">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="flex flex-col items-center ">
                <button
                    onClick={handlePay}
                    className={`bg-primary text-white px-4 py-2 rounded-md border-white border-[1px] hover:bg-sky-400 hover:border-sky-400 sm:w-[400px] w-[300px] ${!cardNumber || !expiryMonth || !expiryYear || !cvc || !email ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!cardNumber || !expiryMonth || !expiryYear || !cvc || !email}
                >
                    Pay
                </button>
            </div>
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

        </div>
    );
};

export default PaymentHero;