import React from "react";
import { MdHome, MdPerson, MdSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";

import defaultAvatar from "../../../assets/images/default-avatar.png";
import Icon from "./../../Icon";

function ProfileDropdown({ profileHover, setProfileHover, avatar }) {
  return (
    <div
      className={`nav-dropdown profile-dropdown ${
        profileHover ? "active" : null
      }`}
      onMouseEnter={() => setProfileHover(true)}
      onMouseLeave={() => setProfileHover(false)}
    >
      <div className="user-details">
        <img src={avatar ? avatar : defaultAvatar} alt="avatar" />
        <h3>Bob Smith</h3>
        <p className="subtitle">bsmith@domain.com</p>
      </div>
      <div className="routes">
        <NavLink to="/">
          <Icon Icon={MdPerson} size={25} color="secondary" />
          <p>Account</p>
        </NavLink>
        <NavLink to="/settings">
          <Icon Icon={MdSettings} size={25} />
          <p>Settings</p>
        </NavLink>
        <NavLink to="/">
          <Icon Icon={MdHome} size={25} color="danger" />
          <p>Logout</p>
        </NavLink>
      </div>
    </div>
  );
}

export default ProfileDropdown;
