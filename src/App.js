import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "./layouts/Landing";
import Auth from "./layouts/Auth";
import Dashboard from "./layouts/Dashboard";
import NotFound from "./views/NotFound";

import ActivityIndicator from "./components/ActivityIndicator";
import AuthContext from "./auth/context";
import { getUser } from "./auth/storage";
import { ThemeProvider } from "./config/ThemeProvider";
import "./assets/scss/styles.scss";

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
            <Route path="/auth" component={Auth} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" component={user ? Dashboard : Landing} />
          </Switch>
        </AuthContext.Provider>
      </ThemeProvider>
    );
  }
}

export default App;
