import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="nav-content">
        <NavLink to="/">
          <img
            src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/logos/logotext.png"
            alt="SquareOneJobs logo"
            className="nav-logo"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
