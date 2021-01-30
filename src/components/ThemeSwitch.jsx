import React from "react";

import useTheme from "../hooks/useTheme";
import MoonIcon from "./icons/MoonIcon";

const ThemeSwitch = () => {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className="switch-container" onClick={() => setIsDark(!isDark)}>
      <div className={`switch-toggle ${isDark ? "active" : null}`}>
        <MoonIcon height="25px" width="25px" />
      </div>
    </div>
  );
};

export default ThemeSwitch;
