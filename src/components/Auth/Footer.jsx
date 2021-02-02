import React from "react";
import { NavLink } from "react-router-dom";

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-content">
        <NavLink to="/" className="copyright">
          © {new Date().getFullYear()} SquareOneJobs
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
