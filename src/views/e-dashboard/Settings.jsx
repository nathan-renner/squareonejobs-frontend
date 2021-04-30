import React from "react";
import Card from "./../../components/Card";
import ThemeSwitch from "./../../components/ThemeSwitch";

function Settings(props) {
  return (
    <Card className="settings">
      <h2>Settings</h2>
      <h3>Preferences</h3>
      <div className="setting">
        <p>Dark Mode</p>
        <ThemeSwitch />
      </div>
    </Card>
  );
}

export default Settings;
