import React from "react";
import { MdHome, MdSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useAuth from "../../../auth/useAuth";

import defaultAvatar from "../../../assets/images/default-avatar.png";
import Icon from "./../../Icon";

function ProfileDropdown({ visible, avatar }) {
  const { user, logout } = useAuth();

  return (
    <div
      className={`nav-dropdown profile-dropdown ${visible ? "active" : null}`}
    >
      <div className="user-details">
        <img
          src={avatar ? `${avatar}?v=${Date.now()}` : defaultAvatar}
          alt="avatar"
        />
        <h3>{user.firstName + " " + user.lastName}</h3>
        <p className="subtitle">{user.email}</p>
      </div>
      <div className="routes">
        {/* <NavLink to="/account">
          <Icon Icon={MdPerson} size={25} color="secondary" />
          <p>Account</p>
        </NavLink> */}
        <NavLink to="/settings">
          <Icon Icon={MdSettings} size={25} color="secondary" />
          <p>Settings</p>
        </NavLink>
        <div className="pointer" onClick={logout}>
          <Icon Icon={MdHome} size={25} />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;