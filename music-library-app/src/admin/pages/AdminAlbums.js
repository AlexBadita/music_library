import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import CardList from "../../components/CardList";
import SearchBar from "../../components/SearchBar";
import { deleteAlbum, getData } from "../../services/ApiService";
import "./styles/AdminAlbums.css";

const AdminAlbums = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const navigate = useNavigate();

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
  }, [data]);

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

  const handleAddAlbumClick = () => {
    navigate("../admin/add-album");
  };

  const handleDeleteAlbum = async (artistId, albumTitle) => {
    try {
      await deleteAlbum(artistId, albumTitle);
      setData((data) =>
        data.filter((artist) =>
          artist.albums.filter((album) => album.title !== albumTitle)
        )
      );
    } catch (error) {
      console.error("Failed to delete album:", error);
    }
  };

  return (
    <div className="albums">
      <AdminNav />
      <SearchBar placeholder={"album"} onSearch={setSearchTerm} />
      <div className="header">
        <h2 className="header-title">Albums</h2>
        <button className="form-button" onClick={handleAddAlbumClick}>
          Add album
        </button>
      </div>
      {filteredData.length > 0 ? (
        <CardList
          artists={filteredData}
          isAdmin={true}
          onDelete={handleDeleteAlbum}
        />
      ) : (
        <div className="no-result">No results found!</div>
      )}
    </div>
  );
};

export default AdminAlbums;
