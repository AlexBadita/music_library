import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/Sidebar.css";

const Sidebar = () => {
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
      </ul>
    </nav>
  );
};

export default Sidebar;
