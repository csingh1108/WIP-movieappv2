import styles from "../style.js";
import Footer from "../Components/Footer.jsx";
import PaymentHero from "../Components/PaymentHero.jsx";
import {useContext, useEffect} from "react";
import {MovieContext} from "../Context/MovieContext.jsx";
import {useNavigate} from "react-router-dom";


const Payment = () => {
    const {
        movieNameContext,
        pickedSeatsContext,
        movieTimeIdContext,
        ticketsContext,
        pricesContext,
        totalPriceContext,
        paymentStatus
    } = useContext(MovieContext);

    const navigate = useNavigate();

    useEffect(() => {
        // Check if any required context value is missing
        if (
            !movieNameContext ||
            !pickedSeatsContext.length ||
            !movieTimeIdContext ||
            !ticketsContext ||
            !pricesContext ||
            totalPriceContext === null ||
            paymentStatus === true
        ) {
            navigate('/error');
        }
    }, [
    ]);

    return (
        <>

            <div className={`${styles.paddingX} ${styles.flexCenter} mb-14 h-screen`}>
                <div className={styles.boxWidth}>
                    <PaymentHero/>
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary`}>
                <div className={styles.boxWidth}>
                    <Footer/>
                </div>
            </div>
        </>
    );
};

export default Payment;