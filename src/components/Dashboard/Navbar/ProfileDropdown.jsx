import React from "react";
import { MdHome, MdSettings } from "react-icons/md";
import { NavLink, useHistory } from "react-router-dom";
import useAuth from "../../../auth/useAuth";
import { useGoogleLogout } from "react-google-login";

import { Icon } from "../../common";
import { useTheme } from "../../../config/ThemeProvider";
import defaultAvatar from "../../../assets/images/default-avatar.png";

function ProfileDropdown({ visible, setDropdown, avatar, name }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const history = useHistory();
  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
  });

  return (
    <div
      className={`nav-dropdown profile-dropdown ${visible ? "active" : null}`}
    >
      <div className="user-details">
        <img src={avatar ? avatar : defaultAvatar} alt="avatar" />
        <h3>{name ? name : ""}</h3>
        <p className="subtitle">{user.email}</p>
      </div>
      <div className="routes">
        {/* <NavLink to="/account">
          <Icon Icon={MdPerson} size={25} color="secondary" />
          <p>Account</p>
        </NavLink> */}
        <NavLink to="/settings" onClick={() => setDropdown(false)}>
          <Icon Icon={MdSettings} size={25} color="secondary" />
          <p>Settings</p>
        </NavLink>
        <div
          className="pointer"
          onClick={() => {
            if (isDark) toggleTheme();
            logout();
            signOut();
            history.replace("/");
          }}
        >
          <Icon Icon={MdHome} size={25} />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;
