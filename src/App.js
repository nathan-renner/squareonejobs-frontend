import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import ThemeContext from "./config/themeContext";

import Landing from "./layouts/Landing";
import Dashboard from "./layouts/Dashboard";
import NotFound from "./views/NotFound";

import "./assets/scss/styles.scss";

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <div className={`theme-${isDark ? "dark" : "light"}`}>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
