import React from "react";
import Sidebar from "../../components/Dashboard/MyJobs/Sidebar";
import { Redirect, Route, Switch } from "react-router-dom";

import Jobs from "./../../components/Dashboard/MyJobs/Jobs";

const root = "/my-jobs";

function MyJobs(props) {
  return (
    <div className="my-jobs">
      <Sidebar data-aos="fade-up" data-aos-once={true} data-aos-delay="100" />
      <Switch>
        <Route path={`${root}/day-jobs`} component={Jobs} />
        <Route path={`${root}/part-time`} component={Jobs} />
        <Route path={`${root}/full-time`} component={Jobs} />
        <Redirect to={`${root}/day-jobs`} />
      </Switch>
    </div>
  );
}

export default MyJobs;
