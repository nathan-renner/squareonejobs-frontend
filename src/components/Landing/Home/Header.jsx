import React from "react";
import { NavLink } from "react-router-dom";

import Button from "../../Button";
import bg1 from "../../../assets/images/landing-bg-1.jpg";
import bg2 from "../../../assets/images/landing-bg-2.jpg";
import bg3 from "../../../assets/images/landing-bg-3.jpg";

function Header() {
  return (
    <header>
      <div className="image-background">
        <img
          className="bg-1"
          src={bg1}
          alt="man standing looking off camera with city in background"
        />
        <img
          className="bg-2"
          src={bg2}
          alt="man standing looking off camera with city in background"
        />
        <img
          className="bg-3"
          src={bg3}
          alt="man standing looking off camera with city in background"
        />
        <svg
          className="line-1"
          preserveAspectRatio="none"
          viewBox="0 0 144 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M71 36C71 0 35 0 35 0V72H107C107 72 71 72 71 36Z"
            fill="white"
          />
          <path d="M0 0H36V72H0V0Z" fill="white" />
        </svg>
      </div>
      <div className="container">
        <div className="content">
          <h1 className="title">
            Job search made <span className="text-primary">personal</span>
          </h1>
          <p className="subtitle">
            Find your potential, unlock your purpose - regardless of the
            obstacles you’ve overcome.
          </p>
          <NavLink to="/auth/register">
            <Button
              label="Find jobs"
              className="button"
              textStyle={{ fontSize: 20 }}
            />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
