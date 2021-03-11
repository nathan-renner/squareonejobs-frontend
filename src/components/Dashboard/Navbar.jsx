import React, { useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import BriefcaseIcon from "./../icons/BriefcaseIcon";
import PencilIcon from "./../icons/PencilIcon";
import ClipboardIcon from "./../icons/ClipboardIcon";
import NotificationsIcon from "./../icons/NotificationsIcon";
import StreakIcon from "./../icons/StreakIcon";

import defaultAvatar from "../../assets/images/default-avatar.png";
import Logo from "../../assets/images/logo.png";
import TextInput from "./../TextInput";
import ProfileDropdown from "./Navbar/ProfileDropdown";
import {
  MdHome,
  MdCreditCard,
  MdLocalShipping,
  MdPerson,
  MdSearch,
} from "react-icons/md";
import StreakDropdown from "./Navbar/StreakDropdown";

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
    name: "/explore",
    title: "Explore",
    Icon: MdSearch,
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
  const history = useHistory();
  const [avatar] = useState(null);
  const [streak] = useState(3);
  const [profileHover, setProfileHover] = useState(false);
  const [streakHover, setStreakHover] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [search, setSearch] = useState("");
  const { pathname } = useLocation();

  const handleFocus = () => {
    setSearchFocus(true);
    if (pathname === "/") history.push("/explore");
  };
  const handleBlur = () => {
    setSearchFocus(false);
  };
  const onSubmitSearch = (e) => {
    e.preventDefault();
    history.replace("/search", {
      search,
    });
  };
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const renderRoutes = () => {
    return routes.map(({ name, title, Icon }, index) => {
      return (
        <NavLink to={name} key={index}>
          <div
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
      );
    });
  };

  return (
    <>
      <div
        className={`overlay-bg ${
          profileHover || streakHover ? "active" : null
        }`}
      />
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
              active={searchFocus ? true : false}
              type="search"
              LeftIcon={MdSearch}
              leftIconSize={18}
              placeholder="Search jobs"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onSubmit={onSubmitSearch}
              onChange={onChangeSearch}
              value={search}
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
          <div
            className="nav-item"
            onMouseEnter={() => setStreakHover(true)}
            onMouseLeave={() => setStreakHover(false)}
          >
            <StreakIcon height={25} width={30} />
          </div>
          <div className="nav-item">
            <NotificationsIcon height={25} width={25} />
          </div>
          <img
            className="nav-item avatar"
            src={avatar ? avatar : defaultAvatar}
            alt="Avatar"
            onMouseEnter={() => setProfileHover(true)}
            onMouseLeave={() => setProfileHover(false)}
          />
        </div>
        <ProfileDropdown {...{ profileHover, setProfileHover, avatar }} />
        <StreakDropdown {...{ streakHover, setStreakHover, streak }} />
      </div>
    </>
  );
};

export default Navbar;
