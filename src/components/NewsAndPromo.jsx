import styles from "../style.js";
import {avatarpromo, holidayparty, membershipimage} from "../assets/index.js";

const NewsAndPromo = () => {
    return (
        <section id="news" className="flex flex-col">
            <h1 className="text-white font-bold text-[32px] font-playfair mb-2">News and Promotions</h1>
            <div className="border-b-[1px] mb-12" />
            <div className={`flex md:flex-row flex-col ${styles.paddingX}`}>
                <div className="p-12 md:max-w-[50%]">
                    <h1 className="text-secondary font-montserrat font-semibold text-[24px] mb-4 text-center">Enjoy the holiday with discounts on Watch Parties!</h1>
                    <p className="text-white font-montserrat md:leading-[32px] leading-[40px]">Step into the enchanting world of our theater this holiday season, where the magic of cinema meets the joy of celebration! We are thrilled to announce special holiday discounts for watch parties, bringing friends and family together for unforgettable movie experiences.
                    </p>
                    <div className="flex justify-around text-center mt-5">
                        <button
                            type="button"
                            className="rounded-full px-2 py-1 border-white border-[1px] text-white w-[150px] h-[40px] mx-auto mt-3 hover:border-blue-500 hover:text-blue-500"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
                <div className={`flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 relative p-12`}>
                    <img src={holidayparty} alt="watch party" className="w-[500px] xs:h-[400px] h-[200px]  z-[1]"/>
                </div>
                <div className="absolute z-[0] w-[80%] h-[50%] -left-[50%] rounded-full blue__gradient"/>
            </div>



            <div className={`flex md:flex-row flex-col-reverse ${styles.paddingX} mt-16`}>
                <div className={`flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 relative p-12`}>
                    <img src={membershipimage} alt="watch party" className="w-[500px] xs:h-[400px] h-[200px]  z-[1]"/>
                </div>
                <div className="p-12 md:max-w-[50%]">
                    <h1 className="text-secondary font-montserrat font-semibold text-[24px] mb-4 text-center">Membership perks!</h1>
                    <p className="text-white font-montserrat md:leading-[32px] leading-[40px]">Unlock a world of cinematic luxury with our exclusive theater membership. Enjoy perks like priority seating, discounted tickets, free popcorn refills, and exclusive access to members-only events, making every visit to the theater an elevated and unforgettable experience.
                    </p>
                    <div className="flex justify-around text-center mt-5">
                        <button
                            type="button"
                            className="rounded-full px-2 py-1 bg-red-700 text-white w-[150px] h-[40px] mx-auto mt-3 hover:opacity-75"
                        >
                            Join Now
                        </button>
                        <button
                            type="button"
                            className="rounded-full px-2 py-1 border-white border-[1px] text-white w-[150px] h-[40px] mx-auto mt-3 hover:border-blue-500 hover:text-blue-500"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="absolute z-[0] w-[70%] h-[50%] -right-[50%] rounded-full orange__gradient"/>
            </div>

            <div className={`flex md:flex-row flex-col ${styles.paddingX} mt-16`}>
                <div className="p-12 md:max-w-[50%]">
                    <h1 className="text-secondary font-montserrat font-semibold text-[24px] mb-4 text-center">Come watch Avatar 2: The Way of Water</h1>
                    <p className="text-white font-montserrat md:leading-[32px] leading-[40px]">Immerse yourself in the mesmerizing world of "Avatar 2" at our theater, where the breathtaking visuals come to life on the big screen. Elevate your cinematic experience by sipping on our specially crafted Tropical Blast drink, a refreshing companion that adds a touch of tropical paradise to your journey through Pandora.
                    </p>
                    <div className="flex justify-around text-center mt-5">
                        <button
                            type="button"
                            className="rounded-full px-2 py-1 bg-red-700 text-white w-[150px] h-[40px] mx-auto mt-3 hover:opacity-75"
                        >
                            Get Tickets
                        </button>
                    </div>
                </div>
                <div className={`flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 relative p-12`}>
                    <img src={avatarpromo} alt="watch party" className="w-[500px] xs:h-[400px] h-[200px] z-[1] object-cover"/>
                </div>
                <div className="absolute z-[0] w-[80%] h-[50%] -left-[50%] rounded-full blue__gradient"/>
            </div>
        </section>
    );
};

export default NewsAndPromo;