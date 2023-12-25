import  {useState} from 'react';
import styles from "../style.js";
import Navbar from "../Components/Navbar.jsx";

const RecoverPassword = () => {
    const [email, setEmail] = useState("");
    const[ emailEntered, setEmailEntered] = useState(false)


    function handleEmail( value) {
        setEmail(value);
    }

    function handleSubmit() {
        setEmailEntered(true);

    }

    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={styles.boxWidth}>
                    <div className="flex justify-center items-center h-screen">
                        {emailEntered ? (
                            <p className="font-montserrat text-white">If an account exists with that email, a message will be send to reset your password.</p>
                        ) : (
                            <div className="flex flex-col text-center justify-center items-center">
                                <p className="font-montserrat text-white mr-4">Enter email:</p>
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => handleEmail(e.target.value)}
                                    className="sm:w-[400px] w-[300px] px-3 py-2 border border-gray-300 rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={(event) => handleSubmit(event)}
                                    className="inline-flex w-[200px] justify-center rounded-md border-[1px] border-white bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:text-sky-400 hover:border-sky-400 mt-4"
                                >
                                    Recover Password
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </>
    );
};

export default RecoverPassword;