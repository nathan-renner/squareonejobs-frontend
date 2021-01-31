import React from "react";

import useTheme from "../hooks/useTheme";
import MoonIcon from "./icons/MoonIcon";

const ThemeSwitch = () => {
  const { isDark, toggleTheme } = useTheme();
  console.log(isDark);
  return (
    <div className="switch-container" onClick={() => toggleTheme()}>
      <div className={`switch-toggle ${isDark ? "active" : null}`}>
        <MoonIcon height="25px" width="25px" />
      </div>
    </div>
  );
};

export default ThemeSwitch;
