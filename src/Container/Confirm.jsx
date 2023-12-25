import React, {useContext, useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import styles from "../style.js";
import {MovieContext} from "../Context/MovieContext.jsx";
import {JwtContext} from "../Context/JwtContext.jsx";
import {jwtDecode} from "jwt-decode";

const Confirm = () => {
    const navigate = useNavigate();
    const {  movieNameContext, ticketsContext, pricesContext, pickedSeatsContext, setTotalPriceContext, setPaymentStatus } = useContext(MovieContext);
    const ticketTypes = ['adult', 'senior', 'child'];
    const { jwt }= useContext(JwtContext);
    const [fee, setFee] = useState(2.69);

    useEffect(() => {
        if(!movieNameContext || !ticketsContext || !pricesContext || !pickedSeatsContext){
            navigate("/")
        }
    }, []);

    useEffect(() => {
        if (jwt) {
            const decoded = jwtDecode(jwt);

            // Ensure that decoded.authorities is an array
            const authoritiesArray = Array.isArray(decoded.authorities)
                ? decoded.authorities
                : typeof decoded.authorities === 'string'
                    ? [decoded.authorities]
                    : [];

            // Check if "ROLE_USER" is in the authorities array
            const isUserRole = authoritiesArray.includes('ROLE_USER');

            // Update fee based on user role
            setFee(isUserRole ? 0 : 2.69);
        }
    }, [jwt]);


    const totalPrice = (pricesContext != null && ticketsContext != null) ? (
        ticketTypes.reduce((total, type) => {
            const price = parseFloat(pricesContext[type].substring(1));
            const ticketTypeTotal = price * (ticketsContext[type] || 0);
            return total + ticketTypeTotal;
        }, fee).toFixed(2)
    ) : null;


    function goToPayment() {
        setTotalPriceContext(totalPrice);
        setPaymentStatus(false);
        navigate("/payment")
    }

    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={styles.boxWidth}>
                    <div className="h-screen flex flex-col items-center justify-center">
                        <h4 className="text-secondary font-playfair text-[20px]">{movieNameContext}</h4>
                        <div className="h-[40vh] w-[50vw] border-t-[1px] border-b-[1px] border-white items-center">
                            <div className="flex flex-col justify-center text-center my-4">
                                <h3 className="font-playfair text-white text-[36px]">Order Details</h3>
                                <div
                                    className="flex flex-row justify-between text-white font-montserrat text-[20px] mt-8">
                                    {ticketTypes.map(type =>
                                        ticketsContext[type] > 0 && (
                                                <React.Fragment key={type}>
                                                    <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                                                    <div className="flex flex-row justify-center items-center">
                                                        <p>{pricesContext[type]}</p><p
                                                        className="text-[16px] text-dimWhite ml-3">x {ticketsContext[type]}</p>
                                                    </div>
                                                </React.Fragment>
                                            )
                                    )}
                                </div>
                                <div className="flex flex-col text-start text-white font-montserrat text-[20px] mt-14">
                                    <p>Fees:</p>
                                    <div className="flex flex-row mt-4 justify-between text-[16px]">
                                        <p>Convenience Fee:</p>
                                        <div>
                                        <p className="text-right">${fee}</p>
                                        </div>
                                    </div>
                                    {fee === 0 ? (
                                        <p className="text-[12px]">Thanks for being a member!</p>
                                    ) : (
                                        <></>
                                    )}

                                </div>
                                <div
                                    className="flex flex-row justify-between items-center text-white font-montserrat text-[20px] mt-14">
                                    <h3 className="font-playfair text-white text-[20px]">Total</h3>
                                    <p>${totalPrice}</p>
                                </div>
                            </div>
                            {pickedSeatsContext ? (
                                <p className="text-dimWhite mt-6 italic">Seats: {pickedSeatsContext.join(', ')}</p>):
                                (<p className="h-[30px]"></p>)}
                            <div className="flex sm:justify-end justify-center sm:mt-0 mt-4">
                                <button
                                    type="button"
                                    onClick={goToPayment}
                                    className="rounded-full px-2 py-1 bg-black text-white border-white border-[2px] w-[150px] h-[50px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold"
                                >
                                    Go to Payment
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
    );
};

export default Confirm;
