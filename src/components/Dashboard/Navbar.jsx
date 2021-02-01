import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BriefcaseIcon from "./../icons/BriefcaseIcon";
import PencilIcon from "./../icons/PencilIcon";
import ClipboardIcon from "./../icons/ClipboardIcon";
import NotificationsIcon from "./../icons/NotificationsIcon";
import StreakIcon from "./../icons/StreakIcon";

import defaultAvatar from "../../assets/images/default-avatar.png";
import Logo from "../../assets/images/logo.png";
import SearchIcon from "./../icons/SearchIcon";
import HomeIcon from "./../icons/HomeIcon";
import MyJobsIcon from "./../icons/MyJobsIcon";
import PaymentsIcon from "./../icons/PaymentsIcon";
import PortfolioIcon from "./../icons/PortfolioIcon";

const routes = [
  {
    name: "/",
    title: "Home",
    Icon: HomeIcon,
  },
  {
    name: "/my-jobs",
    title: "My Jobs",
    Icon: MyJobsIcon,
  },
  {
    name: "/payments",
    title: "Payments",
    Icon: PaymentsIcon,
  },
  {
    name: "/portfolio",
    title: "Portfolio",
    Icon: PortfolioIcon,
  },
];

const Navbar = () => {
  const [avatar] = useState(null);
  const { pathname } = useLocation();

  const renderRoutes = () => {
    return routes.map(({ name, title, Icon }, index) => (
      <NavLink to={name}>
        <div
          key={index}
          className={`navigation-item ${name === pathname ? "active" : null}`}
        >
          <div
            className={`border-container ${
              name === pathname ? "active" : null
            }`}
          >
            <Icon className="nav-icon" />
            <h1 className="nav-text">{title}</h1>
          </div>
        </div>
      </NavLink>
    ));
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="nav-item">
          <NavLink to="/">
            <img className="logo" src={Logo} alt="SquareOneJobs logo" />
          </NavLink>
        </div>
        <div className="navigation-container">{renderRoutes()}</div>
        <div className="search-bar">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            className="search-text"
            placeholder="Search jobs..."
          />
        </div>
        <div className="right-container">
          <div className="stats-container">
            <div className="stat-container">
              <div className="stat">
                <BriefcaseIcon height={30} width={30} />
                <h2 className="stat-text text-primary">2</h2>
              </div>
              <div className="stat-tooltip">
                <h3 className="stat-title">Completed Jobs</h3>
                <p className="stat-description">
                  Complete day jobs to build your portfolio and earn points
                </p>
                <div className="stat-num-container">
                  <BriefcaseIcon height={80} width={80} />
                  <h1 className="stat-number text-primary">2</h1>
                </div>
              </div>
            </div>
            <div className="stat-container">
              <div className="stat">
                <PencilIcon height={30} width={30} />
                <h2 className="stat-text text-purple">2</h2>
              </div>
              <div className="stat-tooltip">
                <h3 className="stat-title">Applications</h3>
                <p className="stat-description">
                  Fill out applications to increase your chance at full
                  employment{" "}
                </p>
                <div className="stat-num-container">
                  <PencilIcon height={80} width={80} />
                  <h1 className="stat-number text-purple">2</h1>
                </div>
              </div>
            </div>
            <div className="stat-container">
              <div className="stat">
                <ClipboardIcon height={30} width={30} />
                <h2 className="stat-text text-secondary">2</h2>
              </div>
              <div className="stat-tooltip">
                <h3 className="stat-title">References</h3>
                <p className="stat-description">
                  Build your portfolio with good employer reviews
                </p>
                <div className="stat-num-container">
                  <ClipboardIcon height={80} width={80} />
                  <h1 className="stat-number text-secondary">2</h1>
                </div>
              </div>
            </div>
          </div>
          <StreakIcon className="nav-item" height={30} width={30} />
          <NotificationsIcon className="nav-item" height={30} width={30} />
          <img
            className="nav-item avatar"
            src={avatar ? avatar : defaultAvatar}
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
