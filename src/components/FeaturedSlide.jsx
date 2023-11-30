import styles from "../style.js";
import { oppenHeadImage } from "../assets/index.js";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {BiLeftArrow, BiRightArrow} from "react-icons/bi";

function NextArrow(props) {
    const { onClick } = props;
    return (
        <i className="text-white hover:text-secondary cursor-pointer arrow-right" style={{backgroundImage:"none"}} onClick={onClick}>
           <BiRightArrow className="w-[30px] h-[30px] transition-all duration-300 hover:scale-125"/>
        </i>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <i className="text-white hover:text-secondary cursor-pointer arrow-left" style={{backgroundImage:"none"}} onClick={onClick}>
            <BiLeftArrow className="w-[30px] h-[30px] transition-all duration-300 hover:scale-125"/>
        </i>
    );
}

const FeaturedSlide = () => {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        centerMode: true,
        centerPadding: "20px",
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
        ]
    };

    return (
        <section id="home" className={`flex flex-col ${styles.paddingY}`}>
            <h1 className="text-white font-playfair font-bold text-[32px] mb-2">Featured Movies</h1>
            <div className="border-b-[1px] mb-12 w-80%" />
            <div className="text-center featured__content">
                <Slider {...settings}>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <div
                            key={index}
                            className={`flex justify-center items-center`}
                        >
                            <img
                                src={oppenHeadImage}
                                alt={`movie poster for Oppenheimer ${index}`}
                                className={`lg:w-[310px] w-[200px] my-0 mx-auto`}
                            />
                            <div className="flex flex-col mt-3">
                                <h1 className="text-white font-montserrat font-semibold">Oppenheimer</h1>
                                <p className="text-dimWhite font-montserrat">1 Hr 50 min | PG-13 </p>
                                <p className="text-dimWhite font-montserrat text-[13px]">Released Oct 2nd, 2023 </p>
                                <button
                                    type="button"
                                    className="rounded-full px-2 py-1 bg-red-700 text-white w-[150px] h-[40px] mx-auto mt-3 hover:opacity-75"
                                >
                                    Get Tickets
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default FeaturedSlide;
