import React from "react";

const Search = ({ setSearch }) => {
  return (
    <div className="search">
      <input
        type="search"
        name="search"
        id="search"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
