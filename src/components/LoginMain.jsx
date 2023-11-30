import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import RegisterModal from "./RegisterModal.jsx";

const LoginMain = () => {
    const navigate = useNavigate();
    const [registerOpen, setRegisterOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberUsername, setRememberUsername] = useState(false);

    const handleLogin = () => {
        // Implement your login logic here
        console.log('Logging in with:', { username, password, rememberUsername });
    };


    function openRegisterModal() {
        setRegisterOpen(prevState => !prevState)
    }

    function closeRegisterModal() {
        setRegisterOpen(prevState => !prevState)
    }

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>

            <div className="mb-4 text-center">
                <label htmlFor="username" className="block text-white font-montserrat mb-2">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter username..."
                />
            </div>

            <div className="mb-4 text-center">
                <label htmlFor="password" className="block font-montserrat text-white mb-2">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter password..."
                />
            </div>

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
                <p className="text-white font-montserrat cursor-pointer hover:text-secondary sm:mt-0 mt-4" onClick={ () => navigate("/recoverpassword")}>
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

export default LoginMain;