import styles from "../style.js";
import Navbar from "../Components/Navbar.jsx";
import MovieDetailsHero from "../Components/Movie-detailsHero.jsx";
import Footer from "../Components/Footer.jsx";
import {useParams} from "react-router-dom";


const MovieDetails = () => {
    let { movieId } = useParams();

    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexCenter} mt-12`}>
                <div className={styles.boxWidth}>
                    <MovieDetailsHero movieID = {movieId}/>
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

export default MovieDetails;