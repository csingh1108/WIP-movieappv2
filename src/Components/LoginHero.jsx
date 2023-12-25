import {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import RegisterModal from "./RegisterModal.jsx";
import {toast, ToastContainer} from "react-toastify";
import {JwtContext} from "../Context/JwtContext.jsx";
import {jwtDecode} from "jwt-decode";

const LoginHero = () => {
    const navigate = useNavigate();
    const [registerOpen, setRegisterOpen] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const [rememberUsername, setRememberUsername] = useState(false);
    const[ validationErrors, setValidationErrors ] = useState({});
    const {setJwt} = useContext(JwtContext);

    const handleLogin = (event) => {
        event.preventDefault();

        const errors = {};
        if(!loginData.email){
            errors.email = "This field is required."
        }
        if(!loginData.password){
            errors.password = "This field is required."
        }
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
        }else{
            fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else if (response.status === 401) {
                        throw new Error("Invalid credentials");
                    } else {
                        throw new Error(`Unexpected error: ${response.statusText}`);
                    }
                })
                .then((data) => {
                    const decoded = jwtDecode(data.token)
                    const expirationTime = decoded.exp * 1000;
                    localStorage.setItem('jwtData', JSON.stringify({ token: data.token, expirationTime }));
                    setJwt(data.token);
                    navigate("/");
                })
                .catch((error) => {
                    toast.error(`Error during login: ${error.message}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                });

        }
    };

    function openRegisterModal() {
        setRegisterOpen(prevState => !prevState)
    }

    function closeRegisterModal() {
        setRegisterOpen(prevState => !prevState)
    }

    function updateLoginData(fieldName, value) {
        setLoginData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    }

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="mb-4 text-center">
                <label htmlFor="email" className="block text-white font-montserrat mb-2">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={loginData.email}
                    onChange={(e) => updateLoginData("email", e.target.value)}
                    className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="John@example.com"
                />
            </div>
            {validationErrors.email && <div
                className="text-red-600 font-montserrat font-semibold text-center">{validationErrors.email}</div>}

            <div className="mb-4 text-center">
                <label htmlFor="password" className="block font-montserrat text-white mb-2">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={loginData.password}
                    onChange={(e) => updateLoginData("password", e.target.value)}
                    className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter password..."
                />
            </div>
            {validationErrors.password && <div
                className="text-red-600 font-montserrat font-semibold text-center">{validationErrors.password}</div>}

            <div className="flex sm:justify-center items-center mb-4 sm:flex-row flex-col sm:space-x-16">
                <div>
                    <input
                        type="checkbox"
                        id="rememberUsername"
                        checked={rememberUsername}
                        onChange={() => setRememberUsername(!rememberUsername)}
                        className="mr-2"
                    />
                    <label htmlFor="rememberUsername" className="font-montserrat text-dimWhite">Remember Username</label>
                </div>
                <p className="text-white font-montserrat cursor-pointer hover:text-secondary sm:mt-0 mt-4" onClick={ () => navigate("/recover")}>
                    Forgot Password?
                </p>
            </div>


            <div  className="flex flex-col items-center ">
            <button
                onClick={handleLogin}
                className="bg-primary text-white px-4 py-2 rounded-md border-white border-[1px] hover:bg-sky-400 hover:border-sky-400 sm:w-[400px] w-[300px]"
            >
                Login
            </button>

            <p className="text-white mt-4 font-semibold text-[18px]">Not yet registered? Register<span className="cursor-pointer text-secondary hover:text-sky-400" onClick={openRegisterModal}> Here</span> </p>
            </div>

            {registerOpen ? (
                <RegisterModal onClose={closeRegisterModal}/>
            ) : (
                <div/>
            )}
        </div>
    );
};

export default LoginHero;