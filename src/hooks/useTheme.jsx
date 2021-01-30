import { useContext } from "react";

import ThemeContext from "../config/themeContext";

const useTheme = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return { isDark, setIsDark };
};

export default useTheme;
