import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "./styles/Home.css";

const Home = ({ data }) => {
  const navigate = useNavigate();

  const handleSongClick = (artistId, albumIndex) => {
    navigate(`/album/${artistId}-${albumIndex}`);
  };
  return (
    <div className="home">
      <SearchBar placeholder={"album, artist or song"} />
      <div className="songs-header">
        <p>Artist</p>
        <p>Album</p>
        <p>Song</p>
        <p className="songs-length">Length</p>
      </div>
      {data.map((artist) =>
        artist.albums.map((album, albumIndex) =>
          album.songs.map((song) => (
            <div
              className="songs-item"
              key={`${artist.id}-${albumIndex}`}
              onClick={() => handleSongClick(artist.id, albumIndex)}
            >
              <p>{artist.name}</p>
              <p>{album.title}</p>
              <p>{song.title}</p>
              <p className="songs-length">{song.length}</p>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default Home;
