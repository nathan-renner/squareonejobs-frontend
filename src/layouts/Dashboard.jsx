import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./../views/dashboard/Home";

const path = "/dashboard";

const Dashboard = () => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={Home} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Dashboard;
