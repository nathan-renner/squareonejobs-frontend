import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Home from "./../views/dashboard/Home";
import Navbar from "./../components/Dashboard/Navbar";
import MyJobs from "./../views/dashboard/MyJobs";
import Payments from "./../views/dashboard/Payments";
import Portfolio from "./../views/dashboard/Portfolio";
import Settings from "./../views/dashboard/Settings";
import Account from "./../views/dashboard/Account";
import Listing from "./../views/dashboard/Listing";
import Explore from "./../views/dashboard/Explore";
import Search from "./../views/dashboard/Search";

const Dashboard = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="dashboard">
      <Navbar />
      <div className="content-container">
        <Switch>
          <Route path={`/listing/:id`} component={Listing} />
          <Route path={`/search`} component={Search} />
          <Route path={`/explore`} component={Explore} />
          <Route path={`/account`} component={Account} />
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
