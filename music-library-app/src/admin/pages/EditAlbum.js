import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editAlbum, getData } from "../../services/ApiService";
import AdminNav from "../components/AdminNav";
import "./styles/EditAlbum.css";

const EditAlbum = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const { artistId, albumTitle } = useParams();
  const [albumName, setAlbumName] = useState(albumTitle);
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumSongs, setAlbumSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getData();
        console.log(data);
        setArtists(data);
        if (data.length > 0) {
          const artist = data.find((artist) => artist.id === artistId);
          console.log(artist);
          setSelectedArtist(artist.name);
          console.log(selectedArtist);
          const album = artist.albums.find(
            (album) => album.title === albumTitle
          );
          console.log(album);
          setAlbumDescription(album.description);
          console.log(albumDescription);
          setAlbumSongs(album.songs);
          console.log(albumSongs);
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
      songs: albumSongs,
      description: albumDescription,
    };
    try {
      await editAlbum(artistId, albumTitle, albumData);
      navigate(-1);
    } catch (error) {
      console.error("Failed to add album:", error);
    }
  };

  return (
    <div className="edit-album">
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

export default EditAlbum;
