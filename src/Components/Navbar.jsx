import {navLinks, navLinksMobile} from "../Constants/index.js";
import {useContext, useEffect, useState} from "react";
import {GiHamburgerMenu} from "react-icons/gi";
import {GrClose} from "react-icons/gr";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {JwtContext} from "../Context/JwtContext.jsx";
import {jwtDecode} from "jwt-decode";


const Navbar = ( { isLoginPage }) => {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const {jwt, setJwt} = useContext(JwtContext);
    const [authorities, setAuthorities] = useState(null);

    function changeToggle() {
        setToggle(prevState => !prevState);
    }

    useEffect(() => {
        if (jwt) {
            const decoded = jwtDecode(jwt);

            // Ensure that decoded.authorities is an array
            const authoritiesArray = Array.isArray(decoded.authorities)
                ? decoded.authorities
                : typeof decoded.authorities === 'string'
                    ? [decoded.authorities]
                    : [];
            setAuthorities(authoritiesArray);
        }
    }, [jwt]);

    function handleLogout() {
        setJwtAndAuthorities(null, null);
        localStorage.removeItem("jwtData");
        changeToggle();
        navigate("/");
    }

    function setJwtAndAuthorities(jwtValue, authoritiesValue) {
        setJwt(jwtValue);
        setAuthorities(authoritiesValue);
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
                <div
                    className="font-montserrat font-normal cursor-pointer text-white hover:text-secondary md:flex hidden ml-12">
                    {authorities && authorities.includes('ROLE_ADMIN') && (
                        <Link to="/admin-dashboard">Admin Dashboard</Link>
                    )}
                </div>
            </ul>
            {isLoginPage ? (
                <div/>
            ) : (
                jwt ? (
                    <div
                        className="font-montserrat font-normal cursor-pointer text-white hover:text-secondary md:flex hidden"
                        onClick={handleLogout}>
                        Logout
                    </div>
                ) : (
                    <div
                        className="font-montserrat font-normal cursor-pointer text-white hover:text-secondary md:flex hidden"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </div>
                )
            )}


            <div className="md:hidden flex flex-1 justify-end items-center">
                {toggle ? (
                    <GrClose className="text-white cursor-pointer hover:text-secondary w-[28px] h-[28px]"
                             onClick={changeToggle}/>
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
                                {navLink.id === 'login' && jwt ? (
                                    <>
                                        <div
                                            className="font-montserrat font-normal cursor-pointer text-[20px] text-white mb-8 hover:text-secondary text-left"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </div>
                                        <div className="border-b-[1px] mt-5 w-[300px]"/>
                                    </>
                                ) : (
                                    <>
                                        {navLink.id === 'admin' && authorities && authorities.includes('ROLE_ADMIN') ? (
                                            <>
                                                <div
                                                      className={`font-montserrat font-normal cursor-pointer text-[20px] text-white mb-8 hover:text-secondary`}
                                                        onClick={() =>navigate(navLink.path)}>
                                                    {navLink.title}
                                                </div>
                                                <div className="border-b-[1px] mt-5 w-[300px]"/>
                                            </>
                                        ) : (
                                            navLink.id !== 'admin' &&
                                            <>
                                                <div
                                                      className={`font-montserrat font-normal cursor-pointer text-[20px] text-white mb-8 hover:text-secondary`}
                                                      onClick={() =>navigate(navLink.path)}>
                                                    {navLink.title}
                                                </div>
                                                <div className="border-b-[1px] mt-5 w-[300px]"/>
                                            </>
                                        )}
                                    </>
                                )}
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