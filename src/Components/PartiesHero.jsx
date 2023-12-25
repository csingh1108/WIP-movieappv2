import styles from "../style.js";
import {
    birthdaypartyimage,
    eventpartyimage, gamingpartyimage,
    indiepartyimage,
    partiesheroimage,
    privatepartyimage,
    trippartyimage
} from "../Assets/index.js";
import {useNavigate} from "react-router-dom";

const PartiesHero = () => {
    const navigate = useNavigate()
    function goToConstruction() {
        navigate("/notyetdone")
    }

    return (
        <div className={`${styles.paddingY} flex flex-col mt-16 mb-16`}>
            <div className={`flex flex-col ${styles.paddingX}`}>
                <div className="text-center">
                    <h1 className="font-playfair text-secondary text-[35px] font-bold">Apex Theatre Has Venues For Every Occasion</h1>
                    <p className="text-white font-montserrat mt-12 leading-[40px]">Apex Theatre offers an exceptional and immersive cinematic experience through their innovative watch parties, making them the perfect choice for a wide range of events. Whether it&apos;s a birthday celebration, corporate gathering, or a casual get-together, Apex Theatre&apos;s watch parties provide a unique and memorable venue. With state-of-the-art facilities, customizable packages, and a vast selection of films, attendees can enjoy a personalized movie night tailored to their preferences, creating an inclusive and entertaining atmosphere for all occasions. The combination of cutting-edge technology and flexible event options makes Apex Theatre an ideal destination for hosting diverse events that cater to a variety of tastes and preferences.</p>
                </div>
                <div className={`flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 relative p-12`}>
                    <img src={partiesheroimage} alt="watch party" className="w-[500px] xs:h-[300px] h-[200px]  z-[1]"/>
                </div>

                <div className="grid md:grid-cols-3 mt-8 grid-cols-2 gap-x-20 gap-y-24">
                    <div className="flex flex-col cursor-pointer" onClick={goToConstruction}>
                        <img src={privatepartyimage} alt="private party promo image" className="rounded-[10px] border-white border-[1px] hover:border-secondary md:h-[250px] sm:h-[200px] h-[150px]"/>
                        <h1 className="font-montserrat text-secondary mt-4 text-[20px] font-semibold">Premium Private Screenings</h1>
                        <p className="font-montserrat text-white">Elevate your movie night with our Premium Private Screenings – an exclusive cinematic experience where you choose the film and enjoy the show in a private setting with your closest friends or family.</p>
                    </div>
                    <div className="flex flex-col cursor-pointer " onClick={goToConstruction}>
                        <img src={eventpartyimage} alt="private party promo image" className="rounded-[10px] border-white border-[1px] hover:border-secondary md:h-[250px] sm:h-[200px] h-[150px]"/>
                        <h1 className="font-montserrat text-secondary mt-4 text-[20px] font-semibold">Meetings and Special Events</h1>
                        <p className="font-montserrat text-white">Transform your meetings and special events into unforgettable moments with Apex Theatre&apos;s watch party packages, combining business with pleasure in a state-of-the-art cinematic environment</p>
                    </div>
                    <div className="flex flex-col cursor-pointer" onClick={goToConstruction}>
                        <img src={trippartyimage} alt="private party promo image" className="rounded-[10px] border-white border-[1px] hover:border-secondary object-cover md:h-[250px] sm:h-[200px] h-[150px]"/>
                        <h1 className="font-montserrat text-secondary mt-4 text-[20px] font-semibold">Field Trips</h1>
                        <p className="font-montserrat text-white">Make learning an adventure with Apex Theatre&apos;s field trips, where students can explore the magic of the big screen, creating educational memories that will last a lifetime.</p>
                    </div>
                    <div className="flex flex-col cursor-pointer" onClick={goToConstruction}>
                        <img src={indiepartyimage} alt="private party promo image" className="rounded-[10px] border-white border-[1px] hover:border-secondary md:h-[250px] sm:h-[200px] h-[150px]"/>
                        <h1 className="font-montserrat text-secondary mt-4 text-[20px] font-semibold">Independent Films</h1>
                        <p className="font-montserrat text-white">Discover the charm of independent cinema with Apex Theatre&apos;s watch parties, showcasing a curated selection of thought-provoking and unique films for an intimate and engaging experience.</p>
                    </div>
                    <div className="flex flex-col cursor-pointer" onClick={goToConstruction}>
                        <img src={gamingpartyimage} alt="private party promo image" className="rounded-[10px] border-white border-[1px] hover:border-secondary md:h-[250px] sm:h-[200px] h-[150px]"/>
                        <h1 className="font-montserrat text-secondary mt-4 text-[20px] font-semibold">Gaming Events</h1>
                        <p className="font-montserrat text-white">Level up your gaming experience with Apex Theatre&apos;s Gaming Events – a larger-than-life setting where friends can gather to play their favorite video games on the big screen.</p>
                    </div>
                    <div className="flex flex-col cursor-pointer" onClick={goToConstruction}>
                        <img src={birthdaypartyimage} alt="private party promo image" className="rounded-[10px] border-white border-[1px] hover:border-secondary md:h-[250px] sm:h-[200px] h-[150px]"/>
                        <h1 className="font-montserrat text-secondary mt-4 text-[20px] font-semibold">Birthday Parties</h1>
                        <p className="font-montserrat text-white">Celebrate your special day in blockbuster style with Apex Theatre&apos;s Birthday Parties, where you and your friends can enjoy a personalized movie night, complete with all the amenities for an unforgettable celebration.</p>
                    </div>
                </div>



            </div>
            
        </div>
    );
};

export default PartiesHero;