import React, { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import "./styles/AdminArtists.css";
import {
  addArtist,
  getData,
  deleteArtist,
  editArtist,
} from "../../services/ApiService";
import SearchBar from "../../components/SearchBar";

const AdminArtists = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [editData, setEditData] = useState(null);
  const [artistData, setArtistData] = useState({
    name: "",
    albums: [
      {
        title: "",
        songs: [
          {
            title: "",
            length: "",
          },
        ],
        description: "",
      },
    ],
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtistData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleFiltering = () => {
      if (!searchTerm) {
        setFilteredData(data);
        return;
      }

      const lowercasedTerm = searchTerm.toLowerCase();
      let artistMatches = [];

      data.forEach((artist) => {
        if (artist.name.toLowerCase().includes(lowercasedTerm)) {
          artistMatches.push(artist);
        }
      });
      setFilteredData(artistMatches);
    };

    handleFiltering();
    console.log(filteredData);
  }, [searchTerm, data]);

  const handleDelete = async (artistId) => {
    try {
      const response = await deleteArtist(artistId);
      setData((prev) => prev.filter((artist) => artist.id !== artistId));
    } catch (error) {
      console.error("Failed to delete artist:", error);
    }
  };

  const handleEditChange = (name, value) => {
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (artistId) => {
    if (!editData) return;
    try {
      const result = await editArtist(artistId, editData);
      setData((prev) =>
        prev.map((artist) => (artist.id === artistId ? result : artist))
      );
      setEditData(null);
    } catch (error) {
      console.error("Failed to update artist:", error);
    }
  };

  const handleArtistSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addArtist(artistData);
      console.log("Artist added successfully:", result);
      setArtistData({
        name: "",
        albums: [
          {
            title: "",
            songs: [
              {
                title: "",
                length: "",
              },
            ],
            description: "",
          },
        ],
      });
      setData((prev) => [...prev, result]);
    } catch (error) {
      console.error("Failed to add artist:", error);
    }
  };

  return (
    <div className="add-form">
      <AdminNav />
      <SearchBar placeholder={"album"} onSearch={setSearchTerm} />
      <form onSubmit={handleArtistSubmit}>
        <h2>Add new artist</h2>
        <div className="form-item">
          <p className="item-name">Name</p>
          <input
            name="name"
            value={artistData.name}
            className="item-value"
            onChange={handleChange}
            required
          />
          <button className="form-button" type="submit">
            Add Artist
          </button>
        </div>
      </form>
      <div className="artists-header">
        <p>#</p>
        <p>Artist</p>
        <p>Edit</p>
        <p>Delete</p>
      </div>
      {filteredData.length > 0 ? (
        filteredData.map((artist, index) =>
          editData && editData.id === artist.id ? (
            <div key={index}>
              <form
                onSubmit={() => handleEditSubmit(editData.id)}
                className="artists-item"
              >
                <p>{index + 1}</p>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  required
                />
                <button className="form-button" type="submit">
                  Update
                </button>
                <p onClick={() => handleDelete(artist.id)}>
                  <i className="fa fa-trash"></i>
                </p>
              </form>
            </div>
          ) : (
            <div className="artists-item" key={index}>
              <p>{index + 1}</p>
              <p>{artist.name}</p>
              <p onClick={() => setEditData(artist)}>
                <i className="fa fa-pen"></i>
              </p>
              <p onClick={() => handleDelete(artist.id)}>
                <i className="fa fa-trash"></i>
              </p>
            </div>
          )
        )
      ) : (
        <div className="no-result">No results found!</div>
      )}
    </div>
  );
};

export default AdminArtists;
