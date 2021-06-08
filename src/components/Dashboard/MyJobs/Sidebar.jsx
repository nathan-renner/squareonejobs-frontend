import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ emp = false, ...props }) {
  return (
    <div className="sidebar" {...props}>
      <NavLink
        to={`/${emp ? "my-listings" : "my-jobs"}/day-jobs`}
        className="route"
      >
        Day Jobs
      </NavLink>
      <NavLink
        to={`/${emp ? "my-listings" : "my-jobs"}/full-time`}
        className="route"
      >
        Full Time
      </NavLink>
      <NavLink
        to={`/${emp ? "my-listings" : "my-jobs"}/part-time`}
        className="route"
      >
        Part Time
      </NavLink>
      {emp ? (
        <NavLink to="/my-listings/drafts" className="route">
          Drafts
        </NavLink>
      ) : (
        <NavLink to="/my-jobs/saved" className="route">
          Saved Listings
        </NavLink>
      )}
    </div>
  );
}

export default Sidebar;
