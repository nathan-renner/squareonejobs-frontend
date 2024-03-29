import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Lottie from "lottie-react";

import Hamburger from "../../assets/animations/hamburger.json";

import { Button } from "../common";

function Navbar({ className, dark = false, fixed = false, noShadow = false }) {
  const { pathname } = useLocation();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [logoWhite, setLogoWhite] = useState(dark ? true : false);
  const hamburgerRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    if (!fixed && window.scrollY <= 300) {
      document.querySelector(".navbar").className = `navbar`;
      dark && setLogoWhite(true);
    } else {
      document.querySelector(".navbar").className = `navbar navbar-light ${
        noShadow ? "no-shadow" : null
      }`;
      dark && setLogoWhite(false);
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
    <div
      className={`navbar ${className ? className : null} ${
        noShadow ? "no-shadow" : null
      }`}
    >
      <div className="navbar-container">
        <NavLink to="/" className="nav-logo-link">
          <img
            alt="SquareOneJobs Logo"
            className={`nav-logo ${logoWhite ? "light" : null}`}
          />
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
          <NavLink to="/resources" className="nav-link">
            Resource Locator
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
            <div className="nav-dropdown">
              <h3>Job Seekers</h3>
              <NavLink to="/resources" className="nav-dropdown-link">
                Resource Locator
              </NavLink>
            </div>
          </div>
          <div className="nav-link-container" tabIndex="0">
            <NavLink to="/employers" className="nav-link">
              Employers
            </NavLink>
            <div className="nav-dropdown">
              <h3>Employers</h3>
              <NavLink to="/auth/postjob" className="nav-dropdown-link">
                Post a Job
              </NavLink>
              {/* <NavLink to="/employers" className="nav-dropdown-link">
                Pricing
              </NavLink> */}
            </div>
          </div>
          <div className="nav-link-container" tabIndex="0">
            <NavLink to="/auth/login" className="nav-link">
              Login
            </NavLink>
          </div>
          {pathname.includes("employers") ? (
            <NavLink to="/auth/postjob" style={{ textDecoration: "none" }}>
              <Button label="Post a Job" className="button btn-lg" />
            </NavLink>
          ) : (
            <NavLink to="/auth/register" style={{ textDecoration: "none" }}>
              <Button label="Find jobs for free" className="button btn-lg" />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
