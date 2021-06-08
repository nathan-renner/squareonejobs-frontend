import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useGoogleLogout } from "react-google-login";
import { MdExpandLess, MdExpandMore, MdHome, MdLock } from "react-icons/md";

import { Card, Icon, ThemeSwitch } from "../../components/common";

import useAuth from "./../../auth/useAuth";
import useApi from "./../../hooks/useApi";
import { deleteUser } from "../../api/users";
import { useResponseModal } from "./../../hooks/useResponseModal";

import { useTheme } from "../../config/ThemeProvider";

function Settings(props) {
  const history = useHistory();
  const [advanced, setAdvanced] = useState(false);
  const deleteUserApi = useApi(deleteUser);
  const { logout } = useAuth();
  const { setModal } = useResponseModal();
  const { isDark, toggleTheme } = useTheme();
  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
  });

  const handleLogout = () => {
    if (isDark) toggleTheme();
    logout();
    signOut();
    history.replace("/");
  };

  const handleDeleteAccount = async () => {
    const result = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (result) {
      const response = await deleteUserApi.request();
      if (response.ok) handleLogout();
      else
        setModal({
          type: "error",
          header: "Something went wrong.",
          body: response.data,
        });
    }
  };

  return (
    <Card className="settings">
      <h2>Settings</h2>
      <h3>Preferences</h3>
      <div className="setting">
        <p>Dark Mode</p>
        <ThemeSwitch />
      </div>
      <h3>Account</h3>
      <div
        className="setting highlight"
        onClick={() => history.push("/settings/change-password")}
      >
        <Icon Icon={MdLock} size={35} color="secondary" />
        <div>
          <p>Change Password</p>
          <p className="subtitle">
            It's a good idea to not use the same password you use anywhere else.
          </p>
        </div>
      </div>
      <div className="setting highlight" onClick={() => handleLogout()}>
        <Icon Icon={MdHome} size={35} color="medium" />
        <div>
          <p>Logout</p>
          <p className="subtitle">
            You'll need to enter your username and password to log back in.
          </p>
        </div>
      </div>

      <p className="advanced-text" onClick={() => setAdvanced(!advanced)}>
        Advanced Options{" "}
        {advanced ? <MdExpandLess /> : <MdExpandMore height={30} />}
      </p>
      <div className={`advanced-options ${advanced ? "opened" : null}`}>
        <div
          className="setting highlight"
          onClick={() => handleDeleteAccount()}
        >
          <Icon Icon={MdHome} size={35} color="danger" />
          <div>
            <p>Delete Account</p>
            <p className="subtitle">
              Your entire account and all of your data will be deleted forever!
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Settings;
