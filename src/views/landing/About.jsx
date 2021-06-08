import React from "react";
import Navbar from "../../components/Landing/Navbar";

function About(props) {
  return (
    <div className="landing about-page">
      <Navbar className="navbar-light" fixed />
      <div className="container-sm">
        <h1>About us</h1>
      </div>
    </div>
  );
}

export default About;
