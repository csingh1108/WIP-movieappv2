import {FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube} from "react-icons/fa";

const Socials = () => {
    return (
        <section id="socials" className="flex flex-col my-12">
            <div className="border-b-[1px] mb-12 w-full" />
            <div className="flex flex-row justify-center ">
                <div className="rounded-full border border-white p-2 hover:border-cyan-400 hover:text-cyan-400 text-white sm:mx-5 mx-2 cursor-pointer">
                    <FaFacebook className=" w-[30px] h-[30px]"/>
                </div>
                <div className="rounded-full border border-white p-2 hover:border-cyan-400 hover:text-cyan-400 text-white sm:mx-5 mx-2 cursor-pointer">
                    <FaInstagram className=" w-[30px] h-[30px] "/>
                </div>
                <div className="rounded-full border border-white p-2 hover:border-cyan-400 hover:text-cyan-400 text-white sm:mx-5 mx-2 cursor-pointer">
                    <FaTwitter className=" w-[30px] h-[30px] "/>
                </div>
                <div className="rounded-full border border-white p-2 hover:border-cyan-400 hover:text-cyan-400 text-white sm:mx-5 mx-2 cursor-pointer">
                    <FaTiktok className=" w-[30px] h-[30px] "/>
                </div>
                <div className="rounded-full border border-white p-2 hover:border-cyan-400 hover:text-cyan-400 text-white sm:mx-5 mx-2 cursor-pointer">
                    <FaYoutube className=" w-[30px] h-[30px] "/>
                </div>
            </div>
        </section>
    );
};

export default Socials;