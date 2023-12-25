import { gql } from '@apollo/client';

// Queries
const GET_MOVIE_BY_ID = gql`
    query getMovieById($id: ID!) {
        getMovieById(id: $id) {
            id
            title
            synopsis
            releaseYear
            duration
            imgUrl
            videoUrl
            rating
            genre
            isFeatured
            movieTimes {
                id
                startTime
                adultPrice
                seniorPrice
                childPrice
                isFull
                reservedSeats {
                    id
                    seatName
                    isTaken
                }
                screen {
                    id
                    screenName
                    capacity
                }
            }
        }
    }
`;

const GET_ALL_FEATURED_MOVIES = gql`
    query getAllMovies{
        getAllMovies{
            id
            title
            releaseYear
            imgUrl
            duration
            rating
            genre
            isFeatured
        }
    }
`;

const GET_ALL_MOVIES = gql`
    query getAllMovies {
        getAllMovies {
            id
            title
            synopsis
            releaseYear
            duration
            imgUrl
            videoUrl
            rating
            genre
            createdDate
            updatedDate
            isFeatured
        }
    }
`;

const SEARCH_MOVIES = gql`
    query searchMovies($searchTerm: String!, $jwt: String!) {
        searchMovies(searchTerm: $searchTerm, jwt: $jwt) {
            id
            title
            synopsis
            releaseYear
            duration
            imgUrl
            videoUrl
            rating
            genre
            createdDate
            updatedDate
            isFeatured
        }
    }
`;


const GET_SCREEN_BY_ID = gql`
    query getScreenById($id: ID!) {
        getScreenById(id: $id) {
            id
            screenName
            capacity
        }
    }
`;

const GET_ALL_SCREENS = gql`
    query getAllScreens {
        getAllScreens {
            id
            screenName
            capacity
            updatedDate
        }
    }
`;

const GET_MOVIE_TIME_BY_ID = gql`
    query getMovieTimeById($id: ID!) {
        getMovieTimeById(id: $id) {
            id
            startTime
            adultPrice
            seniorPrice
            childPrice
            isFull
            reservedSeats {
                id
                seatName
                isTaken
            }
        }
    }
`;

const GET_MOVIE_TIME_RESERVED_SEATS_BY_ID = gql`
    query getMovieTimeById($id: ID!) {
        getMovieTimeById(id: $id) {
            isFull
            reservedSeats {
                id
                seatName
                isTaken
            }
        }
    }
`;

const GET_MOVIE_TIME_PRICES_BY_ID = gql`
    query getMovieTimeById($id: ID!) {
        getMovieTimeById(id: $id) {
            id
            adultPrice
            seniorPrice
            childPrice
            movie {
                title
                imgUrl
            }
        }
    }
`;

const GET_ALL_MOVIE_TIMES = gql`
    query getAllMovieTimes {
        getAllMovieTimes {
            id
            startTime
            adultPrice
            seniorPrice
            childPrice
            isFull
        }
    }
`;

const GET_ALL_MOVIE_TIMES_FULL = gql`
    query getAllMovieTimes {
        getAllMovieTimes {
            id
            startTime
            adultPrice
            seniorPrice
            childPrice
            isFull
            movie {
                id
                title
            }
            screen {
                id
                screenName
            }
            createdDate
            updatedDate
        }
    }
`;


const CREATE_MOVIE = gql`
    mutation createMovie($title: String, $synopsis: String, $releaseYear: Int, $duration: Int, $imgUrl: String, $videoUrl: String, $rating: String, $genre: String, $isFeatured: Boolean, $jwt: String) {
        createMovie(title: $title, synopsis: $synopsis, releaseYear: $releaseYear, duration: $duration, imgUrl: $imgUrl, videoUrl: $videoUrl, rating: $rating, genre: $genre, isFeatured: $isFeatured, jwt: $jwt) {
            id
            title
            synopsis
            releaseYear
            duration
            imgUrl
            videoUrl
            rating
            genre
            isFeatured
        }
    }
`;

const UPDATE_MOVIE = gql`
    mutation updateMovie($id: ID!, $title: String, $synopsis: String, $releaseYear: Int, $duration: Int, $imgUrl: String, $videoUrl: String, $rating: String, $genre: String, $isFeatured: Boolean, $jwt: String) {
        updateMovie(id: $id, title: $title, synopsis: $synopsis, releaseYear: $releaseYear, duration: $duration, imgUrl: $imgUrl, videoUrl: $videoUrl, rating: $rating, genre: $genre, isFeatured: $isFeatured, , jwt: $jwt) {
            id
            title
            synopsis
            releaseYear
            duration
            imgUrl
            videoUrl
            rating
            genre
            isFeatured
        }
    }
`;

const DELETE_MOVIE = gql`
    mutation deleteMovie($id: ID!, $jwt: String! ) {
        deleteMovie(id: $id, , jwt: $jwt)
    }
`;

const CREATE_SCREEN = gql`
    mutation createScreen($screenName: String, $capacity: Int, $jwt: String!) {
        createScreen(screenName: $screenName, capacity: $capacity, , jwt: $jwt) {
            id
            screenName
            capacity
        }
    }
`;

const UPDATE_SCREEN = gql`
    mutation updateScreen($id: ID!, $screenName: String, $capacity: Int, $jwt: String!) {
        updateScreen(id: $id, screenName: $screenName, capacity: $capacity, , jwt: $jwt) {
            id
            screenName
            capacity
        }
    }
`;

const DELETE_SCREEN = gql`
    mutation deleteScreen($id: ID!, $jwt: String!) {
        deleteScreen(id: $id, jwt: $jwt)
    }
`;

const SEARCH_SCREENS = gql`
    query searchScreens($searchTerm: String!, $jwt: String!) {
        searchScreens(searchTerm: $searchTerm, jwt: $jwt) {
            id
            screenName
            capacity
            updatedDate
        }
    }
`

const CREATE_MOVIE_TIME = gql`
    mutation createMovieTime($startTime: String, $adultPrice: Float, $seniorPrice: Float, $childPrice: Float, $isFull: Boolean, $movieId: ID, $screenId: ID) {
        createMovieTime(startTime: $startTime, adultPrice: $adultPrice, seniorPrice: $seniorPrice, childPrice: $childPrice, isFull: $isFull, movieId: $movieId, screenId: $screenId) {
            id
            startTime
            adultPrice
            seniorPrice
            childPrice
            isFull
        }
    }
`;

const UPDATE_MOVIE_TIME = gql`
    mutation updateMovieTime($id: ID!, $startTime: String, $adultPrice: Float, $seniorPrice: Float, $childPrice: Float, $isFull: Boolean) {
        updateMovieTime(id: $id, startTime: $startTime, adultPrice: $adultPrice, seniorPrice: $seniorPrice, childPrice: $childPrice, isFull: $isFull) {
            id
            startTime
            adultPrice
            seniorPrice
            childPrice
            isFull
        }
    }
`;

const DELETE_MOVIE_TIME = gql`
    mutation deleteMovieTime($id: ID!, $jwt: String) {
        deleteMovieTime(id: $id, jwt: $jwt)
    }
`;

const CREATE_SEATS = gql`
    mutation CreateSeats($seatNames: [String], $movieTimeId: ID) {
        createSeats(seatNames: $seatNames, movieTimeId: $movieTimeId) {
            id
            seatName
            isTaken
        }
    }
`;

const CREATE_BOOKING = gql`
    mutation CreateBooking($movieTimeId: ID!, $emailAddress: String!, $pickedSeats: [String!]!, $totalPrice: Float!, $userId: ID) {
        createBooking(movieTimeId: $movieTimeId, emailAddress: $emailAddress, pickedSeats: $pickedSeats, totalPrice: $totalPrice, userId: $userId) {
            id
            movieTime {
                id
                movie {
                    id
                    title
                    imgUrl
                }
                startTime
                screen {
                    screenName
                }
            }
            pickedSeats {
                id
                seatName
            }
            totalPrice
            emailAddress
        }
    }
`;

const DELETE_BOOKING = gql`
    mutation deleteBooking($id: ID!, $jwt: String!){
        deleteBooking(id: $id, jwt: $jwt)
    }
`

const GET_ALL_BOOKINGS = gql`
    query getAllBookings{
        getAllBookings{
            id
            movieTime {
                id
                movie {
                    id
                    title
                    imgUrl
                }
                startTime
                screen {
                    screenName
                }
            }
            pickedSeats {
                id
                seatName
            }
            totalPrice
            emailAddress
            createdDate
        }
    }
`

const SEARCH_BOOKINGS = gql`
    query searchBookings($searchTerm: String!, $jwt: String!) {
        searchBookings(searchTerm: $searchTerm, jwt: $jwt) {
            id
            movieTime {
                id
                movie {
                    id
                    title
                    imgUrl
                }
                startTime
                screen {
                    screenName
                }
            }
            pickedSeats {
                id
                seatName
            }
            totalPrice
            emailAddress
            createdDate
        }
    }
`



const GET_ALL_USERS = gql`
    query getAllUsers($jwt: String!){
        getAllUsers(jwt: $jwt){
            id
            firstName
            lastName
            address
            phone
            dateOfBirth
            email
            createdAt
            role
        }
    }
`;

const DELETE_USER = gql`
    mutation deleteUser($id: ID!, $jwt: String!){
        deleteUser(id: $id, jwt: $jwt)
    }
`

const SEARCH_USERS = gql`
    query searchUsers($searchTerm: String!, $jwt: String!) {
        searchUsers(searchTerm: $searchTerm, jwt: $jwt) {
            id
            firstName
            lastName
            address
            phone
            dateOfBirth
            email
            createdAt
            role
        }
    }
`



export {
    GET_MOVIE_BY_ID,
    GET_ALL_MOVIES,
    GET_ALL_FEATURED_MOVIES,
    CREATE_MOVIE,
    UPDATE_MOVIE,
    DELETE_MOVIE,
    SEARCH_MOVIES,

    GET_SCREEN_BY_ID,
    GET_ALL_SCREENS,
    CREATE_SCREEN,
    UPDATE_SCREEN,
    DELETE_SCREEN,
    SEARCH_SCREENS,

    GET_MOVIE_TIME_BY_ID,
    GET_ALL_MOVIE_TIMES,
    CREATE_MOVIE_TIME,
    UPDATE_MOVIE_TIME,
    DELETE_MOVIE_TIME,
    GET_MOVIE_TIME_PRICES_BY_ID,
    GET_ALL_MOVIE_TIMES_FULL,

    GET_MOVIE_TIME_RESERVED_SEATS_BY_ID,
    CREATE_SEATS,

    CREATE_BOOKING,
    DELETE_BOOKING,
    GET_ALL_BOOKINGS,
    SEARCH_BOOKINGS,

    GET_ALL_USERS,
    DELETE_USER,
    SEARCH_USERS,

};