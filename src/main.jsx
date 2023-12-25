import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {MovieProvider} from "./Context/MovieContext.jsx";
import {JwtProvider} from "./Context/JwtContext.jsx";
import NavbarContainer from "./Container/NavbarContainer.jsx";

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
});


ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <ApolloProvider client={client}>
            <JwtProvider>
                <MovieProvider>
                    <NavbarContainer>
                    <App />
                    </NavbarContainer>
                </MovieProvider>
            </JwtProvider>
        </ApolloProvider>
    </BrowserRouter>


)
