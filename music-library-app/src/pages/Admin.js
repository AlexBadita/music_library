import React from "react";
import Sidebar from "../components/Sidebar";

const Admin = () => {
  return (
    <div className="admin-container">
      <Sidebar isLogged={true} isAdmin={true} />
      <div className="admin-form"></div>
    </div>
  );
};

export default Admin;
