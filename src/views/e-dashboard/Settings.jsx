import React from "react";
import { useHistory } from "react-router-dom";

import Card from "./../../components/Card";
import ThemeSwitch from "./../../components/ThemeSwitch";
import Button from "./../../components/Button";

function Settings(props) {
  const history = useHistory();

  return (
    <Card className="settings">
      <h2>Settings</h2>
      <h3>Preferences</h3>
      <div className="setting">
        <p>Dark Mode</p>
        <ThemeSwitch />
      </div>
      <h3>Account</h3>
      <div className="setting">
        <div>
          <p>Change Password</p>
          <p className="subtitle">
            It's a good idea to not use the same password you use anywhere else.
          </p>
        </div>
        <Button
          outline
          className="btn-sm"
          label="Reset"
          color="transparent"
          textColor="primary"
          onClick={() => history.push("/settings/change-password")}
        />
      </div>
    </Card>
  );
}

export default Settings;
