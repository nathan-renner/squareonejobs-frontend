import React from "react";

const ThemeContext = React.createContext({
  isDark: false,
  setIsDark: () => {},
});

export default ThemeContext;
