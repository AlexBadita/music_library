import React from "react";
import SearchBar from "../components/SearchBar";
import CardList from "../components/CardList";
import "./styles/Home.css";

const Home = ({ data }) => {
  return (
    <div className="home">
      <SearchBar placeholder={"album, artist or song"} />
      <div className="home-content"></div>
    </div>
  );
};

export default Home;
