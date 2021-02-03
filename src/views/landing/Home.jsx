import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../../assets/images/logotext.png";
import Button from "./../../components/Button";

const Home = () => {
  return (
    <div className="section-1">
      <div className="navbar">
        <NavLink to="/">
          <img src={Logo} alt="SquareOneJobs Logo" className="nav-logo" />
        </NavLink>
        <div className="nav-links-container">
          <div className="nav-link-container">
            <NavLink to="/" className="nav-link">
              Employers
            </NavLink>
          </div>
          <div className="nav-link-container">
            <NavLink to="/" className="nav-link">
              Login
            </NavLink>
          </div>
        </div>
      </div>
      <div className="image-background" />
      <svg
        className="line-1"
        viewBox="0 0 1440 940"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.5 942.5V0.5H250C250 0.5 699.5 20.5431 699.5 481.521C699.5 942.5 1440 942.5 1440 942.5H0.5Z"
          fill="white"
        />
      </svg>
      <div className="content">
        <h1 className="title">
          Job search made <span className="text-primary">personal</span>
        </h1>
        <p className="subtitle">
          Find your potential, unlock your purpose - regardless of the obstacles
          you’ve overcome.
        </p>
        <Button
          label="Find jobs"
          onClick={() => "clicked"}
          className="button"
          textStyle={{ fontSize: 20 }}
        />
      </div>
    </div>
  );
};

export default Home;
