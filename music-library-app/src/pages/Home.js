import React from "react";
import SearchBar from "../components/SearchBar";
import CardList from "../components/CardList";

const Home = ({ data, searchTerm, setSearchTerm }) => {
  return (
    <div>
      <SearchBar onSearch={setSearchTerm} />
      <CardList albums={data} />
    </div>
  );
};

export default Home;
