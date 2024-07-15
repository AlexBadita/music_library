import React from "react";
import "./styles/SongItem.css";

const SongItem = ({ index, name, length }) => {
  return (
    <div className="song">
      <p className="song-index">{index}</p>
      <p className="song-name">{name}</p>
      <p className="song-length">{length}</p>
    </div>
  );
};

export default SongItem;
