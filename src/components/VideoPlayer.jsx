import styles from "../style.js";
import {Link} from "react-router-dom";


const VideoPlayer = () => {
    const movieData ={ movieId:2, title: "Oppenheimer", tag: "Adventure", year: "2023", rating: "PG", duration: "160 minutes" }

    const movieTimes = [
        {
            showingId: 1,
            date: "11/30 - Thursday",
            times: ["3:00 PM", "5:00 PM", "8:00 PM"],
        },
        {
            showingId: 2,
            date: "12/01 - Friday",
            times: ["12:00 PM", "2:30 PM", "4:30 PM"],
        },
    ];


    return (
        <div className={`flex flex-col ${styles.paddingY}`}>
            <div className="flex justify-center flex-1 mt-12">
                <iframe
                    className="w-full max-w-screen-xl h-[700px]"
                    src="https://www.youtube.com/embed/uYPbbksJxIg?si=mDIFLEc61uVvAFLL"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="mt-6 flex md:flex-row flex-col">
                <div className="flex flex-col font-montserrat font-semibold text-[18px] min-w-[30%]">
                    <p className="text-white">{movieData.duration} | {movieData.rating}</p>
                    <p className="text-white">{movieData.year}</p>
                    <p className="text-white">{movieData.tag}</p>
                </div>
                <div>
                    <p className="text-white font-montserrat text-[20px] leading-[38px] md:mt-0 mt-6">During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world&apos;s first nuclear explosion, forever changing the course of history.</p>
                </div>
            </div>
            <div className="border-b-[1px] mb-12 mt-8" />

            <div className="flex flex-col">
                <h1 className="font-playfair font-bold text-white text-[32px] text-center">Showtimes</h1>
            </div>

            {movieTimes.map((movieTime) => (
                <div className="flex flex-col mt-12 justify-center items-center" key={movieTime.date}>
                    <p className="text-[22px] font-playfair text-white font-semibold">{movieTime.date}</p>
                    <div className="flex md:flex-row flex-col md:space-x-12 mt-4">
                        {movieTime.times.map((time) => (
                            <a
                                key={time}
                                href={`/seats-selection/${movieTime.showingId}#tickets`}
                                className="rounded-full px-2 py-1 bg-black border-[2px] border-white text-white w-[120px] h-[50px] mt-3 hover:opacity-75 font-semibold justify-center flex items-center"
                                style={{ textDecoration: 'none', color: 'white' }}
                            >
                                {time}
                            </a>

                        ))}
                    </div>
                </div>
            ))}



        </div>
    );
};

export default VideoPlayer;