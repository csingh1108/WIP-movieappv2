import {Route, Routes} from "react-router-dom";
import Home from "./container/Home.jsx";
import Movies from "./container/Movies.jsx";
import Parties from "./container/Parties.jsx";
import Membership from "./container/Membership.jsx";
import Construction from "./container/Construction.jsx";
import Login from "./container/Login.jsx";
import MovieDetails from "./container/Movie-details.jsx";
import Seating from "./container/Seating.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/movies" element={ <Movies/> } />
            <Route path="/watch-parties" element={ <Parties/> } />
            <Route path="/membership" element={ <Membership/> } />
            <Route path="/notyetdone" element={ <Construction/>} />
            <Route path="/login" element={ <Login/>} />

            <Route path="/movie-details/:movieId" element={ <MovieDetails/> } />
            <Route path="/seats-selection/:showingId" element={ <Seating/>}/>
            <Route path="/payment" />
            <Route path="/confirmation" />
            <Route path="/receipt" />
        </Routes>

    );
};

export default App;