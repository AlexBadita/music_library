import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Sidebar.css";

const Sidebar = ({ isLogged, isAdmin }) => {
  return (
    <nav className="sidebar">
      <ul className="sidebar-buttons">
        <NavLink to="/" activeclassname="active" className="sidebar-link">
          <li className="sidebar-item">
            <i className="fa fa-home"></i> Home
          </li>
        </NavLink>
        <NavLink to="/albums" activeclassname="active" className="sidebar-link">
          <li className="sidebar-item">
            <i className="fa fa-record-vinyl"></i> Albums
          </li>
        </NavLink>
        <li className="sidebar-item sidebar-link">Admin</li>
      </ul>
      {isLogged ? (
        isAdmin ? (
          <div className="admin-sidebar">
            <div className="admin-artists">
              <p>Artists</p>
            </div>
            <div className="admin-albums">
              <p>Albums</p>
            </div>
            <div className="admin-songs">
              <p>Songs</p>
            </div>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </nav>
  );
};

export default Sidebar;
