import React, { useParams, useState } from "react";

const AdminAlbumsDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const artistName = localStorage.getItem("artistName");

  return <div></div>;
};

export default AdminAlbumsDetails;
