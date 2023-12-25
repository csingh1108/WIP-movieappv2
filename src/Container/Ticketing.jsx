import styles from "../style.js";
import {useContext, useEffect,} from "react";
import { useParams} from 'react-router-dom';
import {MovieContext} from "../Context/MovieContext.jsx";
import TicketsHero from "../Components/TicketsHero.jsx";


const Ticketing = () => {
    let { showingId } = useParams();

    const {setMovieTimeIdContext}  = useContext(MovieContext);

    useEffect(() => {
        setMovieTimeIdContext(showingId);
    }, [showingId]);

    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={styles.boxWidth}>
                    <TicketsHero showingId={showingId}/>
                </div>
            </div>
        </>
    );
};

export default Ticketing;
