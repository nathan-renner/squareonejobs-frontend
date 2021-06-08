import React from "react";

import { useTheme } from "../../config/ThemeProvider";
import MoonIcon from "./../icons/MoonIcon";

const ThemeSwitch = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="switch-container" onClick={() => toggleTheme()}>
      <div className={`switch-toggle ${isDark ? "active" : null}`}>
        <MoonIcon height="25px" width="25px" />
      </div>
    </div>
  );
};

export default ThemeSwitch;
