import React from "react";
import Card from "./../../Card";
import { useLocation } from "react-router-dom";

function Header({ data, ...props }) {
  const { pathname } = useLocation();

  if (pathname.includes("day-jobs"))
    return (
      <Card simple className="header" {...props}>
        <h2>Day Jobs</h2>
        <div className="stats">
          <div>
            <h3>{data.upcoming.length}</h3>
            <p>Upcoming</p>
          </div>
          <div>
            <h3>{data.pending.length}</h3>
            <p>Pending</p>
          </div>
          <div>
            <h3>{data.previous.length}</h3>
            <p>Previous</p>
          </div>
        </div>
      </Card>
    );
  else if (pathname.includes("part-time"))
    return (
      <Card simple className="header" {...props}>
        <h2>Part-time Jobs</h2>
        <div className="stats">
          <div>
            <h3>{data.offers.length}</h3>
            <p>Offers</p>
          </div>
          <div>
            <h3>{data.applied.length}</h3>
            <p>Applied</p>
          </div>
          <div>
            <h3>{data.watchlist.length}</h3>
            <p>Watchlist</p>
          </div>
        </div>
      </Card>
    );
  else if (pathname.includes("full-time"))
    return (
      <Card simple className="header" {...props}>
        <h2>Full-time Jobs</h2>
        <div className="stats">
          <div>
            <h3>{data.offers.length}</h3>
            <p>Offers</p>
          </div>
          <div>
            <h3>{data.applied.length}</h3>
            <p>Applied</p>
          </div>
          <div>
            <h3>{data.watchlist.length}</h3>
            <p>Watchlist</p>
          </div>
        </div>
      </Card>
    );
  return null;
}

export default Header;
