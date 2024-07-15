import React from "react";
import SearchBar from "../components/SearchBar";
import CardList from "../components/CardList";

const Albums = ({ data }) => {
  return (
    <div className="albums">
      <SearchBar placeholder={"album"} />
      <div className="header">
        <h2 className="header-title">Albums</h2>
      </div>
      <CardList artists={data} />
    </div>
  );
};

export default Albums;
