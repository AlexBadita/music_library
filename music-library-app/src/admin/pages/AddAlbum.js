import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, addAlbum } from "../../services/ApiService";
import AdminNav from "../components/AdminNav";
import "./styles/AddAlbum.css";

const AddAlbum = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getData();
        console.log(data);
        setArtists(data);
        if (data.length > 0) {
          setSelectedArtist(data[0].name);
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const albumData = {
      title: albumName,
      songs: [],
      description: albumDescription,
    };
    try {
      await addAlbum(
        artists.find((artist) => artist.name === selectedArtist).id,
        albumData
      );
      navigate(-1);
    } catch (error) {
      console.error("Failed to add album:", error);
    }
  };

  return (
    <div className="add-album">
      <AdminNav />
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <p>Artist</p>
          <select
            value={selectedArtist}
            onChange={(e) => setSelectedArtist(e.target.value)}
          >
            {artists.map((artist, index) => (
              <option key={index} value={artist.name}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-item">
          <p>Album Name</p>
          <input
            type="text"
            id="albumName"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <p>Album Description</p>
          <textarea
            rows={15}
            cols={100}
            id="albumDescription"
            value={albumDescription}
            onChange={(e) => setAlbumDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="form-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AddAlbum;
