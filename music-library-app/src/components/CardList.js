import React from "react";
import "./styles/CardList.css";
import Card from "./Card";

const CardList = ({ artists, isAdmin, onDelete }) => {
  return (
    <div className="card-list">
      {artists.map((artist) =>
        artist.albums.map((album, index) => (
          <Card
            key={`${artist.id}-${index}`}
            id={`${artist.id}-${index}`}
            albumName={album.title}
            artistName={artist.name}
            isAdmin={isAdmin}
            onDelete={() => onDelete(artist.id, album.title)}
          />
        ))
      )}
    </div>
  );
};

export default CardList;
