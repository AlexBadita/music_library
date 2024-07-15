import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getData } from "./services/ApiService";
import Home from "./pages/Home";
import AlbumDetails from "./pages/AlbumDetails";
import Nav from "./components/Nav";

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
      <Nav />
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/album/:id" element={<AlbumDetails />} />
      </Routes>
    </div>
  );
}

export default App;
