import React from "react";
import { NavLink } from "react-router-dom";

import Logotext from "../../assets/images/logotext.png";

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="nav-content">
        <NavLink to="/">
          <img src={Logotext} alt="SquareOneJobs logo" className="nav-logo" />
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
