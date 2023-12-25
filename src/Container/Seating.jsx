import styles from "../style.js";
import Navbar from "../Components/Navbar.jsx";
import SeatSelectionHero from "../Components/SeatSelectionHero.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {MovieContext} from "../Context/MovieContext.jsx";

const Seating = () => {
    let { showingId } = useParams();
    const {ticketsContext } = useContext(MovieContext);
    const [numOfTickets, setNumOfTickets] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        var total = Object.values(ticketsContext).reduce((a, b) => a + b, 0);
        setNumOfTickets(total);

        if (total === 0) {
            navigate(`/tickets/${showingId}`);
        }
    }, [ticketsContext, showingId, history]);

    return (
        <>


            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={styles.boxWidth}>
                    <SeatSelectionHero numOfTickets={numOfTickets} showingId={showingId}/>
                </div>
            </div>

        </>
    );
};

export default Seating;
