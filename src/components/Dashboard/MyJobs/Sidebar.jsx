import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar(props) {
  return (
    <div className="sidebar" {...props}>
      <NavLink to="/my-jobs/day-jobs" className="route">
        Day Jobs
      </NavLink>
      <NavLink to="/my-jobs/part-time" className="route">
        Part Time
      </NavLink>
      <NavLink to="/my-jobs/full-time" className="route">
        Full Time
      </NavLink>
      <NavLink to="/my-jobs/saved" className="route">
        Saved Listings
      </NavLink>
    </div>
  );
}

export default Sidebar;
