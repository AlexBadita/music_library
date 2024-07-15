import React from "react";
import "./styles/Sidebar.css";

const Sidebar = ({ isLogged, isAdmin }) => {
  return (
    <nav className="sidebar">
      <ul className="sidebar-buttons">
        <li className="sidebar-item">
          <a href="/">
            <i className="fa fa-home"></i> Home
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/albums">
            <i className="fa fa-record-vinyl"></i> Albums
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/">
            <i className="fa fa-microphone"></i> Artists
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/">
            <i className="fa fa-music"></i> Songs
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/">Login</a>
        </li>
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
