import React from "react";
import Sidebar from "../../components/Dashboard/MyJobs/Sidebar";
import { Redirect, Route, Switch } from "react-router-dom";

import Header from "./../../components/Dashboard/MyJobs/Header";
import MyDayJobs from "./../../components/Dashboard/MyJobs/MyDayJobs";
import MyPartTime from "./../../components/Dashboard/MyJobs/MyPartTime";
import MyFullTime from "./../../components/Dashboard/MyJobs/MyFullTime";

const root = "/my-jobs";

function MyJobs(props) {
  return (
    <div className="my-jobs">
      <Header data-aos="fade-up" data-aos-once={true} />
      <div className="body">
        <Sidebar data-aos="fade-up" data-aos-once={true} data-aos-delay="100" />
        <Switch>
          <Route path={`${root}/day-jobs`} component={MyDayJobs} />
          <Route path={`${root}/part-time`} component={MyPartTime} />
          <Route path={`${root}/full-time`} component={MyFullTime} />
          <Redirect to={`${root}/day-jobs`} />
        </Switch>
      </div>
    </div>
  );
}

export default MyJobs;
