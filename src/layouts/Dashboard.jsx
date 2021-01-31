import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./../views/dashboard/Home";
import Sidebar from "./../components/Dashboard/Sidebar";
import Navbar from "./../components/Dashboard/Navbar";

const path = "/dashboard";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-container">
        <Navbar />
        <div className="content-container">
          <Switch>
            <Route exact path={`${path}`} component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
