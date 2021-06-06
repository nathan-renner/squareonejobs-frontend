import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";

import Logo from "../../assets/images/logotext.png";
import Hamburger from "../../assets/animations/hamburger.json";
import Button from "../Button";

function Navbar({ className, setModal }) {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const hamburgerRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    if (window.scrollY > 300) {
      document.querySelector(".navbar").className = "navbar navbar-light";
    } else {
      document.querySelector(".navbar").className = "navbar";
    }
  };

  const toggleDrawer = () => {
    if (!drawerOpened) {
      hamburgerRef.current.playSegments([10, 60], true);
      setDrawerOpened(true);
    } else {
      hamburgerRef.current.playSegments([85, 140], true);
      setDrawerOpened(false);
    }
  };

  return (
    <div className={`navbar ${className ? className : null}`}>
      <div className="navbar-container">
        <NavLink to="/" className="nav-logo-link">
          <img src={Logo} alt="SquareOneJobs Logo" className="nav-logo" />
        </NavLink>
        <div className="hamburger-icon">
          <Lottie
            lottieRef={hamburgerRef}
            animationData={Hamburger}
            loop={false}
            autoplay={false}
            onClick={toggleDrawer}
          />
        </div>
        <div className={`nav-drawer ${drawerOpened ? "opened" : null}`}>
          <h3 className="nav-title">NAVIGATION</h3>
          <NavLink to="/" className="nav-link">
            Job seekers
          </NavLink>
          <NavLink to="/employers" className="nav-link">
            Employers
          </NavLink>
          <NavLink to="/auth/login" className="nav-link">
            Login
          </NavLink>
        </div>
        <div className="nav-links-container">
          <div className="nav-link-container" tabIndex="0">
            <NavLink to="/" className="nav-link">
              Job Seekers
            </NavLink>
          </div>
          <div className="nav-link-container" tabIndex="0">
            <NavLink to="/employers" className="nav-link">
              Employers
            </NavLink>
          </div>
          <div className="nav-link-container" tabIndex="0">
            <NavLink to="/auth/login" className="nav-link">
              Login
            </NavLink>
          </div>
          <NavLink to="/auth/register" style={{ textDecoration: "none" }}>
            <Button label="Find jobs" className="button btn-lg" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
