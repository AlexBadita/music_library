import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import { getArtistAlbum } from "../../services/ApiService";
import { addSong, deleteSong, editSong } from "../../services/ApiService";
import "./styles/AdminAlbumDetails.css";
import placeholder from "../../assets/placeholder.png";

const AdminAlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [editData, setEditData] = useState(null);
  const [songTitle, setSongTitle] = useState(null);
  const artistName = localStorage.getItem("artistName");
  const [newSong, setNewSong] = useState({
    title: "",
    length: "",
  });

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

  const handleChange = (name, value) => {
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (songTitle) => {
    const [artistId, albumIndex] = id.split("-");
    try {
      const response = await deleteSong(artistId, album.title, songTitle);
      setAlbum((prevAlbum) => ({
        ...prevAlbum,
        songs: prevAlbum.songs.filter((song) => song.title !== songTitle),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSongSubmit = async (e) => {
    e.preventDefault();
    const [artistId, albumIndex] = id.split("-");
    try {
      const result = await addSong(artistId, album.title, newSong);
      setAlbum({
        ...album,
        songs: [...album.songs, newSong],
      });
      setNewSong({ title: "", length: "" });
    } catch (error) {
      console.error("Failed to add song:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const [artistId, albumIndex] = id.split("-");
    try {
      await editSong(artistId, album.title, songTitle, editData);
      const updatedSongs = album.songs.map((song) => {
        if (song.title === songTitle) {
          return { ...song, ...editData };
        }
        return song;
      });
      setAlbum((prev) => ({ ...prev, songs: updatedSongs }));
      setEditData(null);
      setSongTitle(null);
    } catch (error) {
      console.error("Failed to edit song:", error);
    }
  };

  if (!album) {
    return <div>Loading album details...</div>;
  }

  return (
    <div className="album-details">
      <AdminNav />
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
      <form onSubmit={handleSongSubmit}>
        <div className="form-item">
          <p>Song Title</p>
          <input
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            required
          />
        </div>
        <div className="form-item">
          <p>Song Length</p>
          <input
            value={newSong.length}
            onChange={(e) => setNewSong({ ...newSong, length: e.target.value })}
            required
          />
        </div>
        <button className="form-button" type="submit">
          Add Song
        </button>
      </form>
      <div className="admin-album-songs-header">
        <p>#</p>
        <p className="admin-header-title">Title</p>
        <p className="admin-header-length">Length</p>
        <p className="header-edit">Edit</p>
        <p className="header-delete">Delete</p>
      </div>
      {album.songs.map((song, index) =>
        editData && songTitle === song.title ? (
          <form className="song" key={index} onSubmit={handleEditSubmit}>
            <p className="song-index">{index + 1}</p>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
            <input
              type="text"
              name="length"
              value={editData.length}
              onChange={(e) => handleChange("length", e.target.value)}
              required
            />
            <button type="submit" className="form-button">
              Edit
            </button>
            <p className="song-delete" onClick={() => handleDelete(song.title)}>
              <i className="fa fa-trash"></i>
            </p>
          </form>
        ) : (
          <div className="admin-song" key={index}>
            <p className="song-index">{index + 1}</p>
            <p className="song-title">{song.title}</p>
            <p className="song-length">{song.length}</p>
            <p
              className="song-edit "
              onClick={() => (setEditData(song), setSongTitle(song.title))}
            >
              <i className="fa fa-pen"></i>
            </p>
            <p className="song-delete" onClick={() => handleDelete(song.title)}>
              <i className="fa fa-trash"></i>
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default AdminAlbumDetails;
