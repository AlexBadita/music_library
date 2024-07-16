import React, { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import CardList from "../../components/CardList";
import SearchBar from "../../components/SearchBar";
import { getData } from "../../services/ApiService";

const AdminAlbums = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

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
      <AdminNav />
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

export default AdminAlbums;
