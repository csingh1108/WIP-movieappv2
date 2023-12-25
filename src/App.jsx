import {useCallback, useContext, useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import { JwtContext } from "./Context/JwtContext.jsx";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "./RouteGuard/PrivateRoute.jsx";


import Home from "./Container/Home.jsx";
import Movies from "./Container/Movies.jsx";
import Parties from "./Container/Parties.jsx";
import Membership from "./Container/Membership.jsx";
import Construction from "./Container/Construction.jsx";
import Login from "./Container/Login.jsx";
import MovieDetails from "./Container/Movie-details.jsx";
import Ticketing from "./Container/Ticketing.jsx";
import Confirm from "./Container/Confirm.jsx";
import Receipt from "./Container/Receipt.jsx";
import Error from "./Container/Error.jsx";
import Payment from "./Container/Payment.jsx";
import Seating from "./Container/Seating.jsx";
import RecoverPassword from "./Container/RecoverPassword.jsx";
import AdminDashboard from "./Container/AdminDashboard.jsx";
import AdminMovies from "./Container/AdminMovies.jsx";
import AdminScreens from "./Container/AdminScreens.jsx";
import AdminBookings from "./Container/AdminBookings.jsx";
import AdminUsers from "./Container/AdminUsers.jsx";
import AdminTimes from "./Container/AdminTimes.jsx";
import AdminCreateMovie from "./Container/AdminCreateMovie.jsx";
import AdminEditMovie from "./Container/AdminEditMovie.jsx";



const App = () => {

    const {jwt, setJwt} = useContext(JwtContext);
    const [authorities, setAuthorities] = useState(null)


    useEffect(() => {
        if (localStorage.getItem("jwtData") !== null) {
            const storedJwtDataString = localStorage.getItem("jwtData");
            const storedJwtData = JSON.parse(storedJwtDataString);
            const storedJwt = storedJwtData.token;
            const expirationTime = storedJwtData.expirationTime;

            if (storedJwt && Date.now() < expirationTime) {
                setJwt(storedJwt);
                const decoded = jwtDecode(storedJwt);
                setAuthorities(decoded.authorities);
            } else {
                setJwt(null);
                localStorage.removeItem("jwtData");
            }
        } else {
            setJwt(null);
        }
    }, [jwt]);


    return (
            <Routes>
                    <Route path="/" element={ <Home/> }/>
                    <Route path="/movies" element={ <Movies/> } />
                    <Route path="/watch-parties" element={ <Parties/> } />
                    <Route path="/membership" element={ <Membership/> } />
                    <Route path="/notyetdone" element={ <Construction/>} />
                    <Route path="/error" element={<Error/>} />
                    <Route path="/login" element={ <Login/>} />
                    <Route path="/movie-details/:movieId" element={ <MovieDetails/> } />
                    <Route path="/tickets/:showingId" element={<Ticketing/>}/>
                    <Route path="/recover" element={<RecoverPassword/>}/>
                    <Route path="/seating/:showingId" element={<Seating/>}/>
                    <Route path="/confirm" element={<Confirm/>}/>
                    <Route path="/payment" element={<Payment/>}/>
                    <Route path="/receipt" element={<Receipt/>}/>

                    <Route path="/admin-dashboard"
                           element={
                               authorities && authorities.includes('ROLE_ADMIN') ? (
                                   <PrivateRoute>
                                       <AdminDashboard/>
                                   </PrivateRoute>
                               ) : (
                                   <Home/>
                               )
                           }/>

                <Route path="/admin-movies"
                       element={
                           authorities && authorities.includes('ROLE_ADMIN') ? (
                               <PrivateRoute>
                                   <AdminMovies/>
                               </PrivateRoute>
                           ) : (
                               <Home/>
                           )
                       }/>

                <Route path="/admin-movies/create"
                       element={
                           authorities && authorities.includes('ROLE_ADMIN') ? (
                               <PrivateRoute>
                                   <AdminCreateMovie/>
                               </PrivateRoute>
                           ) : (
                               <Home/>
                           )
                       }/>

                <Route path="/admin-movies/edit/:movieId"
                       element={
                           authorities && authorities.includes('ROLE_ADMIN') ? (
                               <PrivateRoute>
                                   <AdminEditMovie/>
                               </PrivateRoute>
                           ) : (
                               <Home/>
                           )
                       }/>

                <Route path="/admin-screens"
                       element={
                           authorities && authorities.includes('ROLE_ADMIN') ? (
                               <PrivateRoute>
                                   <AdminScreens/>
                               </PrivateRoute>
                           ) : (
                               <Home/>
                           )
                       }/>

                <Route path="/admin-users"
                       element={
                           authorities && authorities.includes('ROLE_ADMIN') ? (
                               <PrivateRoute>
                                   <AdminUsers/>
                               </PrivateRoute>
                           ) : (
                               <Home/>
                           )
                       }/>

                <Route path="/admin-bookings"
                       element={
                           authorities && authorities.includes('ROLE_ADMIN') ? (
                               <PrivateRoute>
                                   <AdminBookings/>
                               </PrivateRoute>
                           ) : (
                               <Home/>
                           )
                       }/>

                <Route path="/admin-movietimes"
                       element={
                           authorities && authorities.includes('ROLE_ADMIN') ? (
                               <PrivateRoute>
                                   <AdminTimes/>
                               </PrivateRoute>
                           ) : (
                               <Home/>
                           )
                       }/>


            </Routes>

        );
};

export default App;