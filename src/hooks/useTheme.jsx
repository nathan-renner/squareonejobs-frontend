import { useContext } from "react";

import ThemeContext from "../config/themeContext";

const themeKey = "isDark";

const useTheme = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  const toggleTheme = () => {
    localStorage.setItem(themeKey, !isDark);
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
};

export default useTheme;
