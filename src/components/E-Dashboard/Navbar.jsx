import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdHome, MdCreditCard } from "react-icons/md";
import { BiSpreadsheet } from "react-icons/bi";

import ProfileDropdown from "./Navbar/ProfileDropdown";
import NotificationDropdown from "../Dashboard/Navbar/NotificationDropdown";

import NotificationsIcon from "./../icons/NotificationsIcon";
import defaultAvatar from "../../assets/images/default-avatar.png";
import Logo from "../../assets/images/logo.png";

const routes = [
  {
    name: "/",
    title: "Home",
    Icon: MdHome,
  },
  {
    name: "/my-listings",
    title: "My Listings",
    Icon: BiSpreadsheet,
  },
  {
    name: "/payments",
    title: "Payments",
    Icon: MdCreditCard,
  },
];

const Navbar = ({ data }) => {
  const [dropdown, setDropdown] = useState(false);
  const { pathname } = useLocation();

  const renderRoutes = () => {
    const checkActive = (name) => {
      if (name === pathname) return "active";
      else if (
        pathname.substr(1).includes("/") &&
        pathname.substr(0, pathname.indexOf("/", 1)) === name
      )
        return "active";
      return null;
    };
    return routes.map(({ name, title, Icon }, index) => {
      return (
        <NavLink to={name} key={index}>
          <div className={`navigation-item ${checkActive(name)}`}>
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
      );
    });
  };

  const handleDropdown = (drop) => {
    switch (drop) {
      case "notifications":
        setDropdown("notifications");
        break;
      case "profile":
        setDropdown("profile");
        break;
      default:
        setDropdown(false);
    }
  };

  return (
    <>
      <div
        className={`overlay-bg ${dropdown ? "active" : null}`}
        onClick={handleDropdown}
      />
      <div className="navbar-container">
        <div className="navbar employer-nav">
          <NavLink to="/" className="logo">
            <img src={Logo} alt="SquareOneJobs logo" />
          </NavLink>
          <div className="routes-container">{renderRoutes()}</div>
          <div />
          <div
            className={`nav-item ${data.isNewNotifications ? "notif" : null}`}
          >
            <NotificationsIcon
              height={25}
              width={25}
              onClick={() => handleDropdown("notifications")}
            />
          </div>
          <img
            className="nav-item avatar"
            src={data.avatar ? `${data.avatar}?v=${Date.now()}` : defaultAvatar}
            alt="Avatar"
            onClick={() => handleDropdown("profile")}
            style={{ objectFit: "cover" }}
          />
        </div>
        <ProfileDropdown
          visible={dropdown === "profile"}
          setDropdown={setDropdown}
          avatar={data.avatar}
        />
        <NotificationDropdown
          visible={dropdown === "notifications"}
          setDropdown={setDropdown}
        />
      </div>
    </>
  );
};

export default Navbar;
