import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Card.css";
import placeholder from "../assets/placeholder.png";

const Card = ({ id, albumName, artistName, isAdmin, onDelete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [artistId, albumIndex] = id.split("-");

  const hadleCardClick = () => {
    localStorage.setItem("artistName", artistName);
    if (location.pathname.includes("admin")) {
      return navigate(`/admin/album/${id}`);
    }
    return navigate(`/album/${id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/admin/edit-album/${artistId}/${albumName}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await onDelete(artistId, albumName);
  };

  return (
    <div className="card" onClick={hadleCardClick}>
      <img
        src={placeholder}
        alt={`${albumName} cover`}
        className="card-image"
      />
      <div className="card-info">
        <h3 className="card-album">
          {albumName}
          {isAdmin && <i className="fa fa-pen" onClick={handleEdit}></i>}
        </h3>
        <p className="card-artist">
          {artistName}
          {isAdmin && <i className="fa fa-trash" onClick={handleDelete}></i>}
        </p>
      </div>
    </div>
  );
};

export default Card;
