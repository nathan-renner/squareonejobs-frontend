import React, { useState, useContext } from "react";

const themeKey = "isDark";

export const ThemeContext = React.createContext({
  isDark: false,
  toggleTheme: () => {},
});
ThemeContext.displayName = "ThemeContext";

export const ThemeProvider = (props) => {
  let storage = localStorage.getItem(themeKey);
  if (storage === null) {
    localStorage.setItem(themeKey, false);
    storage = localStorage.getItem(themeKey);
  }
  storage = storage === "true" ? true : false;
  const [isDark, setIsDark] = useState(storage);

  const toggleTheme = () => {
    localStorage.setItem(themeKey, !isDark);
    setIsDark(!isDark);
  };

  const defaultTheme = {
    isDark,
    toggleTheme: () => toggleTheme(),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      <div className={`theme-${isDark === true ? "dark" : "light"}`}>
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
