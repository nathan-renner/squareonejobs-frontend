import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";

import Logo from "../../assets/images/logotext.png";
import Hamburger from "../../assets/animations/hamburger.json";

function Navbar(props) {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const hamburgerRef = useRef();

  const toggleDrawer = () => {
    if (!drawerOpened) {
      hamburgerRef.current.playSegments([0, 25], true);
      setDrawerOpened(true);
    } else {
      hamburgerRef.current.playSegments([25, 50], true);
      setDrawerOpened(false);
    }
  };

  return (
    <div className="navbar">
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
          <h2 className="nav-title">NAVIGATION</h2>
          <NavLink to="/" className="nav-link">
            Employers
          </NavLink>
          <NavLink to="/auth/login" className="nav-link">
            Login
          </NavLink>
        </div>
        <div className="nav-links-container">
          <div className="nav-link-container" tabIndex="0">
            <NavLink to="/" className="nav-link">
              Employers
            </NavLink>
          </div>
          <div className="nav-link-container" tabIndex="0">
            <NavLink to="/auth/login" className="nav-link">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
