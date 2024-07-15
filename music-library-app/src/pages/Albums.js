import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CardList from "../components/CardList";
import "./styles/Albums.css";

const Albums = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const handleFiltering = () => {
      if (!searchTerm) {
        setFilteredData(data);
        return;
      }

      const lowercasedTerm = searchTerm.toLowerCase();
      let albumMatches = [];

      data.forEach((artist) => {
        artist.albums.forEach((album) => {
          if (album.title.toLowerCase().includes(lowercasedTerm)) {
            albumMatches.push({
              ...artist,
              albums: [album],
            });
          }
        });
      });
      setFilteredData(albumMatches);
    };

    handleFiltering();
    console.log(filteredData);
  }, [searchTerm, data]);

  return (
    <div className="albums">
      <SearchBar placeholder={"album"} onSearch={setSearchTerm} />
      <div className="header">
        <h2 className="header-title">Albums</h2>
      </div>
      {filteredData.length > 0 ? (
        <CardList artists={filteredData} />
      ) : (
        <div className="no-result">No results found!</div>
      )}
    </div>
  );
};

export default Albums;
