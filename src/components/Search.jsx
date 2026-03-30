import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <input
            type="text"
            className="search-input"
            placeholder="Search by Brand or Model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
};

export default Search;
