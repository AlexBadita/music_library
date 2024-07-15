import React, { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import "./styles/Sidebar.css";

const Sidebar = ({ isLogged, isAdmin }) => {
  return (
    <nav className="sidebar">
      <ul className="sidebar-buttons">
        <NavLink to="/" activeClassName="active" className="sidebar-link">
          <li className="sidebar-item">
            <i className="fa fa-home"></i> Home
          </li>
        </NavLink>
        <NavLink to="/albums" activeClassName="active" className="sidebar-link">
          <li className="sidebar-item">
            <i className="fa fa-record-vinyl"></i> Albums
          </li>
        </NavLink>
        <NavLink
          to="/artists"
          activeClassName="active"
          className="sidebar-link"
        >
          <li className="sidebar-item">
            <i className="fa fa-microphone"></i> Artists
          </li>
        </NavLink>
        <NavLink to="/songs" activeClassName="active" className="sidebar-link">
          <li className="sidebar-item">
            <i className="fa fa-music"></i> Songs
          </li>
        </NavLink>
        <li className="sidebar-item sidebar-link">Login</li>
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
