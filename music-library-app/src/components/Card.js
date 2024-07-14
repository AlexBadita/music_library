import React from "react";
import "./styles/Card.css";

const Card = ({ image, albumName, artistName }) => {
  return (
    <div className="card">
      <img src={image} alt={`${albumName} cover`} className="card-image" />
      <div className="card-info">
        <h3 className="card-album">{albumName}</h3>
        <p className="card-artist">{artistName}</p>
      </div>
    </div>
  );
};

export default Card;
