import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BriefcaseIcon from "./../icons/BriefcaseIcon";
import PencilIcon from "./../icons/PencilIcon";
import ClipboardIcon from "./../icons/ClipboardIcon";
import NotificationsIcon from "./../icons/NotificationsIcon";
import StreakIcon from "./../icons/StreakIcon";

import defaultAvatar from "../../assets/images/default-avatar.png";
import Logo from "../../assets/images/logo.png";
import TextInput from "./../TextInput";
import {
  MdHome,
  MdCreditCard,
  MdLocalShipping,
  MdPerson,
  MdSearch,
} from "react-icons/md";

const routes = [
  {
    name: "/",
    title: "Home",
    Icon: MdHome,
  },
  {
    name: "/my-jobs",
    title: "My Jobs",
    Icon: MdLocalShipping,
  },
  {
    name: "/payments",
    title: "Payments",
    Icon: MdCreditCard,
  },
  {
    name: "/portfolio",
    title: "Portfolio",
    Icon: MdPerson,
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
        <div>
          <NavLink to="/" className="logo">
            <img src={Logo} alt="SquareOneJobs logo" />
          </NavLink>
        </div>
        <div className="routes-container">{renderRoutes()}</div>
        <div className="search">
          <TextInput
            LeftIcon={MdSearch}
            leftIconSize={18}
            textStyle={{ fontSize: 15 }}
            containerStyle={{
              height: 40,
              borderRadius: 20,
            }}
            placeholder="Search jobs"
          />
        </div>
        <div className="stat">
          <BriefcaseIcon height={25} width={25} />
          <h2 className="stat-text text-primary">2</h2>
        </div>
        <div className="stat">
          <PencilIcon height={25} width={25} />
          <h2 className="stat-text text-purple">2</h2>
        </div>
        <div className="stat">
          <ClipboardIcon height={25} width={25} />
          <h2 className="stat-text text-secondary">2</h2>
        </div>
        <div className="nav-item">
          <StreakIcon height={25} width={30} className="nav-icon" />
        </div>
        <div className="nav-item">
          <NotificationsIcon height={25} width={25} className="nav-icon" />
        </div>
        <img
          className="nav-item avatar"
          src={avatar ? avatar : defaultAvatar}
          alt="Avatar"
        />
      </div>
    </div>
  );
};

export default Navbar;
