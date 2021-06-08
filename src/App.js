import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "./layouts/Landing";
import Auth from "./layouts/Auth";
import Dashboard from "./layouts/Dashboard";
import NotFound from "./views/NotFound";

import AuthContext from "./auth/context";
import { getUser } from "./auth/storage";
import { ThemeProvider } from "./config/ThemeProvider";
import "react-calendar/dist/Calendar.css";
import "./assets/scss/styles.scss";
import EDashboard from "./layouts/EDashboard";
import ResponseContext from "./context/responseContext";

import { ActivityIndicator } from "./components/common";

function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user !== null) setUser(user);
    setIsReady(true);
  }, []);

  if (!isReady) return <ActivityIndicator visible />;

  if (isReady) {
    return (
      <ThemeProvider>
        <ResponseContext.Provider value={{ modal, setModal }}>
          <AuthContext.Provider value={{ user, setUser }}>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/not-found" component={NotFound} />
              <Route
                path="/"
                component={
                  user
                    ? user.userType === "employer"
                      ? EDashboard
                      : Dashboard
                    : Landing
                }
              />
            </Switch>
          </AuthContext.Provider>
        </ResponseContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
