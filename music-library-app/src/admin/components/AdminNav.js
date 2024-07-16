import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/AdminNav.css";

const AdminNav = () => {
  return (
    <div className="nav">
      <ul className="nav-buttons">
        <NavLink to="/admin/home" activeclassname="active" className="nav-link">
          <li className="nav-item">Home</li>
        </NavLink>
        <NavLink
          to="/admin/artists"
          activeclassname="active"
          className="nav-link"
        >
          <li className="nav-item">Artists</li>
        </NavLink>
        <NavLink
          to="/admin/albums"
          activeclassname="active"
          className="nav-link"
        >
          <li className="nav-item">Albums</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default AdminNav;
