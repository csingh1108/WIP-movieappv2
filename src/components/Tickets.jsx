
import { useState, useEffect } from 'react';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';

const TicketCounter = ({ updateNumOfTickets, scrollToSeating  }) => {
    const [tickets, setTickets] = useState({
        adult: 0,
        teen: 0,
        child: 0,
    });

    const [prices, setPrices] = useState({
        adult: "$10.00",
        teen: "$8.00",
        child: "$5.00",
    });

    const increment = (type) => {
        setTickets((prevTickets) => ({
            ...prevTickets,
            [type]: prevTickets[type] + 1
        }));
    };

    const decrement = (type) => {
        setTickets((prevTickets) => ({
            ...prevTickets,
            [type]: Math.max(prevTickets[type] - 1, 0)
        }));
    };

    useEffect(() => {
        updateNumOfTickets(calculateTotalTickets());
    }, [tickets, updateNumOfTickets]);

    const areAnyTicketsSelected = Object.values(tickets).some((quantity) => quantity > 0);

    const calculateTotalTickets = () => {
        return Object.values(tickets).reduce((total, quantity) => total + quantity, 0);
    };

    const scrollToSeatingSelection =() => {
        console.log("clicked")
        scrollToSeating();
    }

    return (
        <section id="tickets" className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col font-montserrat sm:text-[24px] text-[28px] text-white items-start">
                <h4 className="font-playfair text-[36px] mb-[10px] sm:text-start text-center text-secondary">Purchase Tickets</h4>
                <div className="flex sm:flex-row flex-col space-x-1">
                    <div className="flex justify-center space-x-[20px]">
                        <button type="button" onClick={() => increment('adult')}>
                            <FaRegPlusSquare className="sm:w-[28px] sm:h-[28px] w-[32px] h-[32px]" />
                        </button>
                        <button type="button" onClick={() => decrement('adult')}>
                            <FaRegMinusSquare className="sm:w-[28px] sm:h-[28px] w-[32px] h-[32px]" />
                        </button>
                    </div>
                    <span className={`${tickets.adult > 0 ? 'text-secondary' : ''}`}>
                        {tickets.adult} Adult Ticket(s)
                    </span>
                    - {prices.adult} ea.
                </div>

                <div className="flex sm:flex-row flex-col space-x-1 mt-4">
                    <div className="flex justify-center space-x-[20px]">
                        <button type="button" onClick={() => increment('teen')} >
                            <FaRegPlusSquare className="sm:w-[28px] sm:h-[28px] w-[32px] h-[32px]" />
                        </button>
                        <button type="button" onClick={() => decrement('teen')} >
                            <FaRegMinusSquare className="sm:w-[28px] sm:h-[28px] w-[32px] h-[32px]" />
                        </button>
                    </div>
                    <span className={`${tickets.teen > 0 ? 'text-secondary' : ''}`}>
                        {tickets.teen} Teen Ticket(s)
                    </span>
                    - {prices.teen} ea
                </div>
                <div className="flex sm:flex-row flex-col space-x-1  mt-4">
                    <div className="flex justify-center space-x-[20px]">
                        <button type="button" onClick={() => increment('child')} >
                            <FaRegPlusSquare className="sm:w-[28px] sm:h-[28px] w-[32px] h-[32px]" />
                        </button>
                        <button type="button" onClick={() => decrement('child')} >
                            <FaRegMinusSquare className="sm:w-[28px] sm:h-[28px] w-[32px] h-[32px]" />
                        </button>
                    </div>
                    <span className={`${tickets.child > 0 ? 'text-secondary' : ''}`}>
                        {tickets.child} Child Ticket(s)
                    </span>
                    - {prices.child} ea
                </div>
            </div>
            <button
                type="button"
                onClick={scrollToSeatingSelection}
                className={`rounded-full px-2 py-1 bg-black text-white border-white border-[2px] w-[120px] h-[50px] hover:border-sky-400 hover:text-sky-400 font-montserrat font-bold mt-12 ${
                    !areAnyTicketsSelected ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!areAnyTicketsSelected}
            >
                Continue
            </button>
        </section>
    );
};

export default TicketCounter;
