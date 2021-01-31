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
    <div className="navbar-container-dashboard">
      <div className="navbar">
        <div>
          <h2>DASHBOARD</h2>
        </div>
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
                <h1 class="stat-number text-primary">2</h1>
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
                Fill out applications to increase your chance at full employment{" "}
              </p>
              <div className="stat-num-container">
                <PencilIcon height={80} width={80} />
                <h1 class="stat-number text-purple">2</h1>
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
                <h1 class="stat-number text-secondary">2</h1>
              </div>
            </div>
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
