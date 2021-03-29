import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import Card from "../../Card";
import Header from "./Header";
import JobsList from "../../JobsList";
import Button from "./../../Button";

const part = {
  offers: [],
  applied: [],
  watchlist: [],
};

function MyPartTime(props) {
  const history = useHistory();
  const { offers, applied, watchlist } = part;

  return (
    <div className="my-jobs-content">
      <Header
        data-aos="fade-up"
        data-aos-once={true}
        data-aos-delay="100"
        data={part}
      />
      {offers.length > 0 && (
        <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="300">
          <div className="section-header">
            <h2>Upcoming</h2>
            <NavLink to="/my-jobs/day-jobs">See all</NavLink>
          </div>
          <JobsList jobs={offers} />
        </Card>
      )}
      {applied.length > 0 && (
        <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
          <div className="section-header">
            <h2>Pending</h2>
            <NavLink to="/my-jobs/day-jobs">See all</NavLink>
          </div>
          <JobsList jobs={applied} />
        </Card>
      )}
      {watchlist.length > 0 && (
        <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="500">
          <div className="section-header">
            <h2>Previous</h2>
            <NavLink to="/my-jobs/day-jobs">See all</NavLink>
          </div>
          <JobsList jobs={watchlist} />
        </Card>
      )}
      {offers.length === 0 && applied.length === 0 && watchlist.length === 0 && (
        <Card
          data-aos="fade-up"
          data-aos-once={true}
          data-aos-delay="300"
          className="no-jobs-card"
        >
          <h2>No part-time jobs</h2>
          <Button
            label="Find part-time jobs"
            onClick={() => history.push("/explore")}
          />
        </Card>
      )}
    </div>
  );
}

export default MyPartTime;
