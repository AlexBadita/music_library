import React from "react";
import "./styles/SearchBar.css";

const SearchBar = ({ placeholder }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={`Search for ${placeholder}`}
        // onChange={(e) => onSearch(e.target.value)}
      />
      <svg
        className="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.46a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
      </svg>
    </div>
  );
};

export default SearchBar;
