import { createContext, useReducer } from "react";

// Action types
const SET_JWT = 'SET_JWT';

// Reducer function
const jwtReducer = (state, action) => {
    switch (action.type) {
        case SET_JWT:
            return { ...state, jwt: action.payload };
        default:
            return state;
    }
};

// Initial state
const initialState = {
    jwt: null,
};

// Create context
export const JwtContext = createContext();

// Context provider component
export const JwtProvider = ({ children }) => {
    const [state, dispatch] = useReducer(jwtReducer, initialState);
    const setJwt = (jwt) => {
        dispatch({ type: SET_JWT, payload: jwt });
    };

    return (
        <JwtContext.Provider value={{ jwt: state.jwt, setJwt }}>
            {children}
        </JwtContext.Provider>
    );
};
