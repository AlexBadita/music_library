import React from "react";
import "./styles/SearchBar.css";

const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={`Search for ${placeholder}`}
        onChange={(e) => onSearch(e.target.value)}
      />
      <i className="fas fa-search search-icon"></i>
    </div>
  );
};

export default SearchBar;
