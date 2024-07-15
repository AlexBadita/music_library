import React from "react";
import "./styles/CardList.css";
import Card from "./Card";

const CardList = ({ artists }) => {
  console.log(artists);
  return (
    <div className="card-list">
      {artists.map((artist) =>
        artist.albums.map((album, index) => (
          <Card
            key={`${artist.id}-${index}`}
            id={`${artist.id}-${index}`}
            image={"https://placehold.co/400"}
            albumName={album.title}
            artistName={artist.name}
          />
        ))
      )}
    </div>
  );
};

export default CardList;
