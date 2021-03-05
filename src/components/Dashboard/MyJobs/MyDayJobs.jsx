import React from "react";
import Card from "../../Card";
import { NavLink } from "react-router-dom";

function MyDayJobs(props) {
  return (
    <div className="my-jobs-content">
      <div className="section-header">
        <h2>Upcoming</h2>
        <NavLink to="/my-jobs/day-jobs">See all</NavLink>
      </div>
      <Card>asdf</Card>
      <Card />
      <Card />
      <div className="section-header">
        <h2>Pending</h2>
        <NavLink to="/my-jobs/day-jobs">See all</NavLink>
      </div>
      <Card />
      <Card />
      <Card />
      <div className="section-header">
        <h2>Previou</h2>
        <NavLink to="/my-jobs/day-jobs">See all</NavLink>
      </div>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default MyDayJobs;
