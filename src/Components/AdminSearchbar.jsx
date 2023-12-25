import React, { useState, useEffect, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLazyQuery } from '@apollo/client';
import { JwtContext } from '../Context/JwtContext.jsx';

const UniversalSearchbar = ({ updateResults, searchQuery }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { jwt } = useContext(JwtContext);

    const [search, { loading, error, data }] = useLazyQuery(searchQuery);

    useEffect(() => {
        if (!loading && data) {
            updateResults(data);
        }
    }, [data, loading, updateResults]);

    const handleSearch = () => {
        search({ variables: { searchTerm, jwt } });
    };

    return (
        <div className="mt-24 flex justify-center items-center">
            <input
                className="border-white sm:w-[40%] w-[80%] h-[40px] rounded-[10px]  p-2"
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button
                className="rounded-full cursor-pointer text-black p-2 ml-2 hover:text-white bg-gradient-to-l from-gray-600 to-white transform hover:scale-95 transition-transform"
                onClick={handleSearch}
            >
                <FaSearch />
            </button>
        </div>
    );
};

export default UniversalSearchbar;
