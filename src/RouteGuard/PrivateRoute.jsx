import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { JwtContext } from "../Context/JwtContext.jsx";
import backendcaller from "../Helpers/backendcaller.jsx";

const PrivateRoute = ({ children }) => {
    const { jwt } = useContext(JwtContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                if (jwt) {
                    const isValid = await backendcaller(`http://localhost:8080/auth/validate?token=${jwt}`, "GET", jwt);
                    setIsValid(isValid);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error validating token:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [jwt]);

    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        return isValid === true ? children : <Navigate to="/" />;
    }
};

export default PrivateRoute;
