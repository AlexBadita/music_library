import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./styles/Nav.css";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <button className="nav-button back" onClick={() => navigate(-1)}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="nav-button forward" onClick={() => navigate(1)}>
        <i className="fas fa-chevron-right"></i>
      </button>
      <Sidebar />
    </div>
  );
};

export default Nav;
