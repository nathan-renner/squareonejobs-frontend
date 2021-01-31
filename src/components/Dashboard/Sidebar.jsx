import React from "react";

import Logo from "../../assets/images/logo-white.png";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <img className="logo" src={Logo} alt="SquareOneJobs logo" />
      </div>
    </div>
  );
};

export default Sidebar;
