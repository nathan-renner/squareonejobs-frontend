import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./../views/dashboard/Home";
import Navbar from "./../components/Dashboard/Navbar";
import MyJobs from "./../views/dashboard/MyJobs";
import Payments from "./../views/dashboard/Payments";
import Portfolio from "./../views/dashboard/Portfolio";
import Settings from "./../views/dashboard/Settings";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="content-container">
        <Switch>
          <Route path={`/settings`} component={Settings} />
          <Route path={`/portfolio`} component={Portfolio} />
          <Route path={`/payments`} component={Payments} />
          <Route path={`/my-jobs`} component={MyJobs} />
          <Route exact path={`/`} component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
