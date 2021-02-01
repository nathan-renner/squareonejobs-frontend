import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import AuthContext from "./auth/context";
import { getUser } from "./auth/storage";

import Landing from "./layouts/Landing";
import Dashboard from "./layouts/Dashboard";
import NotFound from "./views/NotFound";

import "./assets/scss/styles.scss";
import { ThemeProvider } from "./config/ThemeProvider";
import ActivityIndicator from "./components/ActivityIndicator";

function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user !== null) setUser(user);
    setIsReady(true);
  }, []);

  if (!isReady) return <ActivityIndicator visible />;

  if (isReady) {
    return (
      <ThemeProvider>
        <AuthContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route path="/not-found" component={NotFound} />
            <Route path="/" component={user ? Dashboard : Landing} />
          </Switch>
        </AuthContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
