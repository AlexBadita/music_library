import React, { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import SearchBar from "../../components/SearchBar";
import { getData } from "../../services/ApiService";
import "./styles/Admin.css";

const Admin = () => {
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
      let artistMatches = [];
      let albumMatches = [];
      let songMatches = [];

      data.forEach((artist) => {
        if (artist.name.toLowerCase().includes(lowercasedTerm)) {
          artistMatches.push(artist);
        } else {
          artist.albums.forEach((album) => {
            if (album.title.toLowerCase().includes(lowercasedTerm)) {
              albumMatches.push({
                ...artist,
                albums: [album],
              });
            } else {
              album.songs.forEach((song) => {
                if (song.title.toLowerCase().includes(lowercasedTerm)) {
                  songMatches.push({
                    ...artist,
                    albums: [
                      {
                        ...album,
                        songs: [song],
                      },
                    ],
                  });
                }
              });
            }
          });
        }
      });

      setFilteredData([...artistMatches, ...albumMatches, ...songMatches]);
    };
    handleFiltering();
  }, [searchTerm, data]);

  return (
    <div className="admin-home">
      <AdminNav />
      <SearchBar
        placeholder={"album, artist or song"}
        onSearch={setSearchTerm}
      />
      <div className="songs-header">
        <p>Artist</p>
        <p>Album</p>
        <p>Song</p>
        <p className="songs-length">Length</p>
      </div>
      {filteredData.length > 0 ? (
        filteredData.map((artist) =>
          artist.albums.map((album, albumIndex) =>
            album.songs.map((song, songIndex) => (
              <div
                className="songs-item"
                key={`${artist.id}-${albumIndex}-${songIndex}`}
              >
                <p>{artist.name}</p>
                <p>{album.title}</p>
                <p>{song.title}</p>
                <p className="songs-length">{song.length}</p>
              </div>
            ))
          )
        )
      ) : (
        <div className="no-result">No results found!</div>
      )}
    </div>
  );
};

export default Admin;
