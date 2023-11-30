import {navLinks, navLinksMobile} from "../constants/index.js";
import {FaSearch} from "react-icons/fa";
import {useState} from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import {GrClose} from "react-icons/gr";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";


const Navbar = ( { isLoginPage }) => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);

    function changeToggle() {
        setToggle(prevState => !prevState);
    }

    return (
        <div className="w-full flex justify-center items-center flex-row md:mt-0 mt-3">
            <h1 className="font-playfair text-white font-bold lg:text-[32px] text-[24px] cursor-pointer" onClick={() => navigate("/")}><span className="text-secondary">Apex</span> Theatre</h1>
            <ul className="list-none md:flex hidden justify-center items-center flex-1">
                {navLinks.map((navLink, index) => (
                    <Link key={`${navLink.id}+${index}`} to={navLink.path} className={`font-montserrat font-normal cursor-pointer text-white hover:text-secondary ${index === navLinks.length -1 ? 'mr-0' : 'mr-10'}`}>
                        {navLink.title}
                    </Link>
                ))}
                <div className="lg:flex hidden justify-center items-center searchBar ml-8">
                    <input
                        type="text"
                        className="rounded-[15px] w-[300px] mr-2"
                        placeholder="Search"
                    />
                </div>
                <FaSearch className="text-white cursor-pointer hover:text-secondary lg:ml-0 ml-4" />
            </ul>
            {isLoginPage ? (
                <div/>
            ) : (
                <div className="font-montserrat font-normal cursor-pointer text-white hover:text-secondary md:flex hidden" onClick={() => navigate("/login")}>
                    Login
                </div>
            )}


            <div className="md:hidden flex flex-1 justify-end items-center">
                {toggle ? (
                    <GrClose className="text-white cursor-pointer hover:text-secondary w-[28px] h-[28px]" onClick={changeToggle}/>
                ) : (
                    <GiHamburgerMenu className="text-white cursor-pointer hover:text-secondary w-[28px] h-[28px]" onClick={changeToggle} />
                )}

                <div className={`${toggle ? 'md:block' : 'hidden'} p-6 fixed top-10 right-0 h-full w-full rounded-xl z-10 bg-primary`}>
                    <ul className="list-none flex flex-col justify-end items-center flex-1 mt-3">
                        {navLinksMobile.map((navLink, index) => (
                            <li
                                key={`${navLink.id}-${index}`}
                                className={`font-montserrat font-normal cursor-pointer text-[20px] text-white mb-8 hover:text-secondary`}
                            >
                                <a href={`${navLink.path}`}>{navLink.title}</a>
                                <div className="border-b-[1px] mt-5 w-[300px]"/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

Navbar.propTypes = {
    isLoginPage: PropTypes.bool,
};

export default Navbar;