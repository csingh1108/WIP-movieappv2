import { useState } from "react";

const createRows = (rowColumnCounts) => {
    return rowColumnCounts.map((colCount) =>
        new Array(colCount).fill(false)
    );
};

const SeatSelection = ({numOfTickets}) => {
    const rowColumnCounts = [9, 9, 9, 9, 0, 10, 11, 12, 12, 13, 14, 14];
    const [seats, setSeats] = useState(() => createRows(rowColumnCounts));

    const toggleSeat = (row, col) => {
        const newData = [...seats];
        newData[row][col] = !newData[row][col];
        setSeats(newData);
    };

    const getSeatLabel = (index) => {
        return String.fromCharCode(65 + index);
    };

    return (
        <section id="seating" className="flex flex-col items-center w-[100%]">
            <div className="bg-gray-600 flex text-center mb-8 mt-16">
                <div className="w-[600px] h-[50px]">
                    <p className="text-white text-[30px] font-bold ">Screen</p>
                </div>
            </div>
            <div className="w-full overflow-x-auto">
                {seats.map((row, rowIndex) => (
                    <div key={rowIndex} className={`flex flex-nowrap justify-center mb-2 ${rowIndex === 5 || rowIndex === 8  ? "mt-8" : "mt-0"}`}>
                        {row.map((col, colIndex) => (
                            <button
                                key={colIndex}
                                onClick={() => toggleSeat(rowIndex, colIndex)}
                                className={`rounded-t-[10px] min-w-[35px] min-h-[35px] mr-[10px] text-[16px]  ${col ? "bg-secondary" : "bg-green-700"}`}
                            > {getSeatLabel(rowIndex)}
                                {colIndex}</button>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SeatSelection;