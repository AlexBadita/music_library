import React from "react";
import SearchBar from "../components/SearchBar";
import CardList from "../components/CardList";
import "./styles/Home.css";

const Home = ({ data }) => {
  return (
    <div className="home">
      <SearchBar placeholder={"album, artist or song"} />
      <div className="header">
        <h2 className="header-title">Albums</h2>
      </div>
      <CardList artists={data} />
    </div>
  );
};

export default Home;
