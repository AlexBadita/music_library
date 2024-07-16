import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtistAlbum } from "../services/ApiService";
import "./styles/AlbumDetails.css";
import SongItem from "../components/SongItem";
import Nav from "../components/Nav";
import placeholder from "../assets/placeholder.png";

const AlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const artistName = localStorage.getItem("artistName");

  useEffect(() => {
    const [artistId, albumIndex] = id.split("-");
    async function fetchAlbumDetails(artistId, albumIndex) {
      try {
        const result = await getArtistAlbum(artistId, albumIndex);
        setAlbum(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchAlbumDetails(artistId, albumIndex);
  }, [id]);

  if (!album) {
    return <div>Loading album details...</div>;
  }

  return (
    <div className="album-details">
      <Nav />
      <div className="album-header">
        <img
          src={placeholder}
          alt={`${album.title} cover`}
          className="album-image"
        />
        <div className="album-info">
          <p className="title">Album</p>
          <h1 className="album-title">{album.title}</h1>
          <h4 className="artist-name">By {artistName}</h4>
        </div>
      </div>
      <p className="album-description">{album.description}</p>
      <div className="album-songs-header">
        <p>#</p>
        <p className="header-title">Title</p>
        <p className="header-length">Length</p>
      </div>
      {album.songs.map((song, index) => (
        <SongItem
          key={index}
          index={index}
          name={song.title}
          length={song.length}
        />
      ))}
    </div>
  );
};

export default AlbumDetails;
