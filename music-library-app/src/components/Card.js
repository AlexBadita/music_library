import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Card.css";

const Card = ({ id, image, albumName, artistName }) => {
  const navigate = useNavigate();

  const hadleCardClick = () => {
    navigate(`/album/${id}`);
  };

  return (
    <div className="card" onClick={hadleCardClick}>
      <img src={image} alt={`${albumName} cover`} className="card-image" />
      <div className="card-info">
        <h3 className="card-album">{albumName}</h3>
        <p className="card-artist">{artistName}</p>
      </div>
    </div>
  );
};

export default Card;
