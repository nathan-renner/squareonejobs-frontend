import React from "react";
import Sidebar from "../../components/Dashboard/MyJobs/Sidebar";
import { Redirect, Route, Switch } from "react-router-dom";

import MyDayJobs from "./../../components/Dashboard/MyJobs/MyDayJobs";
import MyPartTime from "./../../components/Dashboard/MyJobs/MyPartTime";
import MyFullTime from "./../../components/Dashboard/MyJobs/MyFullTime";
import SavedJobs from "../../components/Dashboard/MyJobs/SavedJobs";

const root = "/my-jobs";

function MyJobs(props) {
  return (
    <div className="my-jobs">
      <Sidebar data-aos="fade-up" data-aos-once={true} />
      <Switch>
        <Route path={`${root}/day-jobs`} component={MyDayJobs} />
        <Route path={`${root}/part-time`} component={MyPartTime} />
        <Route path={`${root}/full-time`} component={MyFullTime} />
        <Route path={`${root}/saved`} component={SavedJobs} />
        <Redirect to={`${root}/day-jobs`} />
      </Switch>
    </div>
  );
}

export default MyJobs;
