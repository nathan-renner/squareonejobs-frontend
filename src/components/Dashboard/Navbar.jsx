import React, { useState } from "react";
import BriefcaseIcon from "./../icons/BriefcaseIcon";
import PencilIcon from "./../icons/PencilIcon";
import ClipboardIcon from "./../icons/ClipboardIcon";
import NotificationsIcon from "./../icons/NotificationsIcon";
import StreakIcon from "./../icons/StreakIcon";

import defaultAvatar from "../../assets/images/default-avatar.png";
import ThemeSwitch from "./../ThemeSwitch";

const Navbar = () => {
  const [avatar] = useState(null);

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div>
          <h2>DASHBOARD</h2>
        </div>
        <div className="stats-container">
          <div className="stat-container">
            <BriefcaseIcon height={30} width={30} />
            <h2 className="stat-text text-primary">2</h2>
            <div className="stat-tooltip">
              <h3 className="stat-title">Completed Jobs</h3>
              <p className="stat-description">
                Complete day jobs to build your portfolio and earn points
              </p>
              <div className="stat-num-container">
                <BriefcaseIcon height={80} width={80} />
                <h1 class="stat-number">2</h1>
              </div>
            </div>
          </div>
          <div className="stat-container">
            <PencilIcon height={30} width={30} />
            <h2 className="stat-text text-purple">2</h2>
            <div className="stat-tooltip"></div>
          </div>
          <div className="stat-container">
            <ClipboardIcon height={30} width={30} />
            <h2 className="stat-text text-secondary">2</h2>
            <div className="stat-tooltip"></div>
          </div>
        </div>
        <div className="right-container">
          <ThemeSwitch />
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
