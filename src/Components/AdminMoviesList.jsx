import { useQuery } from "@apollo/client";
import { GET_ALL_MOVIES } from "../GraphQLQueries/index.jsx";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatDateTruncated} from "../Helpers/index.jsx";
import {useNavigate} from "react-router-dom";

const AdminMoviesList = ({ filteredMovies }) => {
    AdminMoviesList.propTypes = {
        filteredMovies: PropTypes.shape({
            searchMovies: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                releaseYear: PropTypes.number.isRequired,
                duration: PropTypes.number.isRequired,
                genre: PropTypes.string.isRequired,
                isFeatured: PropTypes.bool.isRequired,
                createdDate: PropTypes.string,
                updatedDate: PropTypes.string,
            })),
        }),
    };
    const navigate= useNavigate();
    const { loading, error, data } = useQuery(GET_ALL_MOVIES, {
        fetchPolicy: 'network-only',
    });
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        let sortedMovies = [];

        if (!filteredMovies) {
            sortedMovies = (data?.getAllMovies || []).slice();
        } else if (filteredMovies && Array.isArray(filteredMovies.searchMovies)) {
            sortedMovies = filteredMovies.searchMovies.slice();
        }

        sortedMovies.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));

        setMovies(sortedMovies);
    }, [data, filteredMovies]);



    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }



    return (
        <div className="mt-12 overflow-auto" style={{maxHeight: "600px"}}>
            <table className="text-white w-full text-center border-separate border-spacing-y-4 bg-gray-950 p-6 ">
                <thead className="border-[1px] border-white text-[20px]">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th className="">Release Year</th>
                    <th>Duration</th>
                    <th className="">Genre</th>
                    <th className="">Featured</th>
                    <th>Last Updated</th>
                    <th>Movie Times</th>
                </tr>
                <tr>
                    <td colSpan="8">
                        <div className="border-b-[1px] border-dimWhite w-full"/>
                    </td>
                </tr>
                </thead>

                <tbody>
                {movies.map((movie, index) => (
                    <React.Fragment key={movie.id}>
                        <tr className="space-2 font-semibold">
                            <td>{index+1}</td>
                            <td className="hover:text-sky-400 cursor-pointer text-secondary"
                                onClick={() => navigate(`/admin-movies/edit/${movie.id}`)}>{movie.title}</td>
                            <td className="">{movie.releaseYear}</td>
                            <td>{movie.duration}</td>
                            <td className="">{movie.genre}</td>
                            <td className="">{movie.isFeatured ? "Yes" : "No"}</td>
                            <td>{formatDateTruncated(movie.updatedDate)}</td>
                        </tr>
                        {index < movies.length - 1 && (
                            <tr>
                                <td colSpan="8">
                                    <div className="border-b-[1px] border-dimWhite w-full"/>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminMoviesList;
