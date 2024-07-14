import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getData } from "./services/ApiService";
import CardList from "./components/CardList";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import Albums from "./pages/Albums";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredData = data.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/albums">
            <Albums />
          </Route>
        </Switch>
      </BrowserRouter>
      {/* <SearchBar onSearch={setSearchTerm} />
      <CardList artists={filteredData} /> */}
    </div>
  );
}

export default App;
