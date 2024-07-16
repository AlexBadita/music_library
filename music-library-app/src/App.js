import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { getData } from "./services/ApiService";
import Home from "./pages/Home";
import AlbumDetails from "./pages/AlbumDetails";
import Admin from "./admin/pages/Admin";
import Albums from "./pages/Albums";
import AdminArtists from "./admin/pages/AdminArtists";
import AdminAlbums from "./admin/pages/AdminAlbums";
import AdminAlbumDetails from "./admin/pages/AdminAlbumDetails";
import AddAlbum from "./admin/pages/AddAlbum";
import EditAlbum from "./admin/pages/EditAlbum";

function App() {
  const [data, setData] = useState([]);

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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/albums" element={<Albums data={data} />} />
        <Route path="/album/:id" element={<AlbumDetails />} />
        <Route path="/admin/home" element={<Admin />} />
        <Route path="/admin" element={<Navigate to="/admin/home" replace />} />
        <Route path="/admin/artists" element={<AdminArtists />} />
        <Route path="/admin/albums" element={<AdminAlbums />} />
        <Route path="/admin/album/:id" element={<AdminAlbumDetails />} />
        <Route path="/admin/add-album" element={<AddAlbum />} />
        <Route
          path="/admin/edit-album/:artistId/:albumTitle"
          element={<EditAlbum />}
        />
      </Routes>
    </div>
  );
}

export default App;
