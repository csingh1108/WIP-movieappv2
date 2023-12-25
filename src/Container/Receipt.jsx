import {useContext, useEffect} from 'react';
import styles from '../style.js';
import Navbar from '../Components/Navbar.jsx';
import Footer from "../Components/Footer.jsx";
import {MovieContext} from "../Context/MovieContext.jsx";
import {formatDate} from "../Helpers/index.jsx";
import {useNavigate} from "react-router-dom";

const Receipt = () => {
    const navigate = useNavigate();
    const {bookingContext, setPaymentStatus} = useContext(MovieContext);

    useEffect(() => {
        // Check if bookingContext is not available
        if (!bookingContext) {
            navigate("/");
        }
        setPaymentStatus(true);
    }, [bookingContext]);

    const title = bookingContext?.movieTime?.movie?.title;
    const date = bookingContext?.movieTime?.startTime;
    const seats = bookingContext?.pickedSeats?.map(seat => seat.seatName) || [];
    const screen = bookingContext?.movieTime?.screen?.screenName;
    const price = bookingContext?.totalPrice;
    const img = bookingContext?.movieTime?.movie?.imgUrl;

    function goToHome() {
        navigate("/");
    }

    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexCenter}  mt-12 `}>
                <div
                    className=" flex sm:flex-row flex-col justify-center items-center h-[80vh] gap-[40px] sm:text-left text-center">
                    <img
                        src={img}
                        alt={`movie poster for ${title}`}
                        className={`lg:w-[310px] w-[200px] my-0 mx-auto`}
                    />
                    <div className="flex flex-col font-montserrat">
                        <h2 className="font-bold mb-4 font-playfair">Thank You for Your Purchase!</h2>
                        <p className="text-secondary ">Movie: {title}</p>
                        <p>Date: {formatDate(date)}</p>
                        <p> Picked Seats: {seats}</p>
                        <p> Screen Number: {screen}</p>
                        <p> Total Price: ${price}</p>
                        <p className="mt-12">A receipt has been sent to your email. Please show it to an attendant to
                            redeem your tickets.</p>
                        <p>Alternatively, scan the QR code in the email at any APEX Theatre self check-out kiosk. We
                            hope you enjoy your theatre experience!</p>
                    </div>
                </div>
            </div>
            <button
                type="button"
                onClick={goToHome}
                className="rounded-full px-2 py-1 bg-black text-white border-white border-[2px] w-[120px] h-[50px] hover:border-red-500 hover:text-red-500 font-montserrat font-bold "
            >
                Exit
            </button>
            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary mt-12`}>
                <div className={styles.boxWidth}>
                    <Footer/>
                </div>
            </div>
        </>
    );
};

export default Receipt;