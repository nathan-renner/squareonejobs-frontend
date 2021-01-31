import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import ThemeContext from "./config/themeContext";

import Landing from "./layouts/Landing";
import Dashboard from "./layouts/Dashboard";
import NotFound from "./views/NotFound";

import "./assets/scss/styles.scss";

const useThemeWithLocalStorage = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem("isDark") || false);

  useEffect(() => {
    localStorage.setItem("isDark", isDark);
  });

  return [isDark, setIsDark];
};

function App() {
  const [isReady, setIsReady] = useState(false);
  const [isDark, setIsDark] = useThemeWithLocalStorage();

  useEffect(() => {
    console.log(isDark);
    setIsReady(true);
  }, [isDark]);

  if (!isReady) {
    return null;
  }

  if (isReady) {
    return (
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <div className={`theme-${isDark === true ? "dark" : "light"}`}>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" component={Landing} />
          </Switch>
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;
