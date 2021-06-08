import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import MyDrafts from "./../../components/E-Dashboard/MyListings/MyDrafts";
import MyFullListings from "./../../components/E-Dashboard/MyListings/MyFullListings";
import MyPartListings from "./../../components/E-Dashboard/MyListings/MyPartListings";
import MyDayListings from "./../../components/E-Dashboard/MyListings/MyDayListings";
import Sidebar from "../../components/Dashboard/MyJobs/Sidebar";

function MyListings(props) {
  const root = "/my-listings";
  return (
    <div className="my-listings">
      <Sidebar data-aos="fade-up" data-aos-once={true} emp />
      <Switch>
        <Route path={`${root}/day-jobs`} component={MyDayListings} />
        <Route path={`${root}/part-time`} component={MyPartListings} />
        <Route path={`${root}/full-time`} component={MyFullListings} />
        <Route path={`${root}/drafts`} component={MyDrafts} />
        <Redirect to={`${root}/day-jobs`} />
      </Switch>
    </div>
  );
}

export default MyListings;
