import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "./styles/Home.css";

const Home = ({ data }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSongClick = (artistId, albumIndex) => {
    navigate(`/album/${artistId}-${albumIndex}`);
  };

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
    <div className="home">
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
                onClick={() => handleSongClick(artist.id, albumIndex)}
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

export default Home;
