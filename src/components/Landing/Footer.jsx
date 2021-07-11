import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../../assets/images/logo-white.png";
import Instagram from "./../icons/Instagram";
import Twitter from "./../icons/Twitter";
import Linkedin from "./../icons/Linkedin";
import Facebook from "./../icons/Facebook";
import Medium from "./../icons/Medium";

function Footer(props) {
  return (
    <section className="footer bg-dark">
      <div className="container">
        <div className="footer-container">
          <div className="left">
            <div>
              <h5>TITLE</h5>
              <NavLink to="/about">About us</NavLink>
              <a
                href="https://medium.com/squareonejobs"
                target="_blank"
                rel="noreferrer"
              >
                Blog
              </a>
              <NavLink to="/">Employers</NavLink>
            </div>
            <div>
              <h5>LEGAL</h5>
              <a
                href="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/legal/SquareOneJobs+Privacy+Policy.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Privacy Policy
              </a>
              <a
                href="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/legal/SquareOneJobs+Terms+and+Conditions.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Terms and Conditions
              </a>
              <NavLink to="/eula">EULA</NavLink>
            </div>
          </div>
          <div className="right">
            <NavLink to="/" className="img-container">
              <img src={Logo} alt="SquareOneJob's logo" />
            </NavLink>
            <div className="socials">
              <a
                href="https://www.linkedin.com/company/squareonejobs/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin width="40" />
              </a>
              <a
                href="https://twitter.com/square1jobs"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter width="40" />
              </a>
              <a
                href="https://www.instagram.com/squareonejobs/"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram width="40" />
              </a>
              <a
                href="https://www.facebook.com/Squareonejobs-106690148326459"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook width="40" />
              </a>
              <a
                href="https://medium.com/squareonejobs"
                target="_blank"
                rel="noreferrer"
              >
                <Medium width="40" />
              </a>
            </div>
          </div>
        </div>
        <p className="copyright">© {new Date().getFullYear()} SquareOneJobs</p>
      </div>
    </section>
  );
}

export default Footer;
