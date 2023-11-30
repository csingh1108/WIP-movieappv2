import styles from "../style.js";
import SeatSelection from "../components/SeatSelection.jsx";
import Tickets from "../components/Tickets.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useState} from "react";

const Seating = () => {
    const [numOfTickets, setNumOfTickets] = useState(0);
    const [seatsSelected, setSeatsSelected] = useState(false);

    const updateNumOfTickets = (num) => {
        setNumOfTickets(num);
        if(num > 0){
            setSeatsSelected(true)
        }
    };

    const scrollToSeating = () => {
        const seatingSection = document.getElementById('seating');

        if (seatingSection) {
            seatingSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="app__bg w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary navbar`}>
                <div className={styles.boxWidth}>
                    <Navbar />
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={styles.boxWidth}>
                    <Tickets updateNumOfTickets={updateNumOfTickets} scrollToSeating={scrollToSeating}/>
                    {seatsSelected && <SeatSelection numOfTickets={numOfTickets} />}
                </div>
            </div>

            <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary`}>
                <div className={styles.boxWidth}>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Seating;
