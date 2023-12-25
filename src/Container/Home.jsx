import styles from "../style.js";
import FeaturedSlide from "../Components/FeaturedSlide.jsx";
import NewsAndPromo from "../Components/NewsAndPromo.jsx";
import Socials from "../Components/Socials.jsx";
import Footer from "../Components/Footer.jsx";
import {useContext, useEffect} from "react";
import {MovieContext} from "../Context/MovieContext.jsx";



const Home = () => {
    const { setMovieNameContext, setPickedSeatsContext, setMovieTimeIdContext, setPricesContext, setTicketsContext, setEmailContext, setTotalPriceContext, setBookingContext } = useContext(MovieContext);

    useEffect(() => {
        // Reset all context fields when landing on the home page
        setMovieNameContext('');
        setPickedSeatsContext([]);
        setMovieTimeIdContext(null);
        setPricesContext(null);
        setTicketsContext({
            adult: 0,
            senior: 0,
            child: 0,
        });
        setEmailContext('');
        setTotalPriceContext(0);
        setBookingContext(null);
    }, [setMovieNameContext, setPickedSeatsContext, setMovieTimeIdContext, setPricesContext, setTicketsContext, setTotalPriceContext, setBookingContext]);

    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={styles.boxWidth}>
                    <FeaturedSlide/>
                    <NewsAndPromo/>
                    <Socials/>
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

export default Home;