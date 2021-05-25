import React, { useEffect, useState } from "react";
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
import NotificationDropdown from "./Navbar/NotificationDropdown";
import StatDropdown from "./Navbar/StatDropdown";

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

const completedData = {
  name: "completed",
  title: "Completed Jobs",
  subtitle: "Complete day jobs to build your portfolio and earn points",
  Icon: BriefcaseIcon,
};
const appData = {
  name: "applications",
  title: "Applications",
  subtitle: "Fill out applications to increase your chance at full employment",
  Icon: PencilIcon,
};
const refData = {
  name: "references",
  title: "References",
  subtitle: "Build your portfolio with positive employer reviews",
  Icon: ClipboardIcon,
};

const Navbar = ({ data }) => {
  const history = useHistory();
  const [searchFocus, setSearchFocus] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    completedData.stat = data.completedDayJobsLength;
    appData.stat = data.applicationsLength;
    refData.stat = data.refsLength;
  });

  const handleFocus = () => {
    setSearchFocus(true);
  };
  const handleBlur = () => {
    setSearchFocus(false);
  };
  const onSubmitSearch = (e) => {
    e.preventDefault();
    history.replace(`/search?q=${search}`);
  };
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

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
      case "completedJobs":
        setDropdown("completedJobs");
        break;
      case "applications":
        setDropdown("applications");
        break;
      case "references":
        setDropdown("references");
        break;
      case "streak":
        setDropdown("streak");
        break;
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
          <div className="stat" onClick={() => handleDropdown("completedJobs")}>
            <BriefcaseIcon height={25} width={25} />
            <h2 className="stat-text text-primary">
              {data.completedDayJobsLength}
            </h2>
          </div>
          <div className="stat" onClick={() => handleDropdown("applications")}>
            <PencilIcon height={25} width={25} />
            <h2 className="stat-text text-purple">{data.applicationsLength}</h2>
          </div>
          <div className="stat" onClick={() => handleDropdown("references")}>
            <ClipboardIcon height={25} width={25} />
            <h2 className="stat-text text-secondary">{data.refsLength}</h2>
          </div>
          <div className="nav-item" onClick={() => handleDropdown("streak")}>
            <StreakIcon height={25} width={30} />
          </div>
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
            src={data.avatar ? data.avatar : defaultAvatar}
            alt="Avatar"
            onClick={() => handleDropdown("profile")}
          />
        </div>
        <ProfileDropdown
          visible={dropdown === "profile"}
          avatar={data.avatar}
          setDropdown={setDropdown}
        />
        <StreakDropdown visible={dropdown === "streak"} streak={data.streak} />
        <NotificationDropdown visible={dropdown === "notifications"} />
        <StatDropdown
          data={completedData}
          visible={dropdown === "completedJobs"}
        />
        <StatDropdown data={appData} visible={dropdown === "applications"} />
        <StatDropdown data={refData} visible={dropdown === "references"} />
      </div>
    </>
  );
};

export default Navbar;
