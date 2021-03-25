import React from "react";
import moment from "moment";
import { NavLink, useLocation } from "react-router-dom";

import Card from "../../Card";
import Header from "./Header";
import JobsList from "../../JobsList";

const day = {
  upcoming: [
    {
      _id: 123551,
      companyLogo:
        "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
      position: "Box Mover",
      startDateTime: moment(),
      endDateTime: moment().add(8, "hours"),
      location: "1 Castle Point Terrace, Hoboken NJ, 07030",
    },
    {
      _id: 123551,
      companyLogo:
        "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
      position: "Box Mover",
      startDateTime: moment(),
      endDateTime: moment().add(8, "hours"),
      location: "1 Castle Point Terrace, Hoboken NJ, 07030",
    },
  ],
  pending: [],
  previous: [
    {
      _id: 123551,
      companyLogo:
        "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
      position: "Box Mover",
      startDateTime: moment(),
      endDateTime: moment().add(8, "hours"),
      location: "1 Castle Point Terrace, Hoboken NJ, 07030",
    },
  ],
};
const part = {
  offers: [1, 2],
  applied: [1, 2],
  watchlist: [1, 2],
};
const full = {
  offers: [1, 2],
  applied: [1, 2],
  watchlist: [1, 2],
};

function Jobs(props) {
  //const [data, setData] = useState();
  const { pathname } = useLocation();

  if (pathname.includes("day-jobs"))
    return (
      <div className="my-jobs-content">
        <Header
          data-aos="fade-up"
          data-aos-once={true}
          data-aos-delay="200"
          data={day}
          pathname={pathname}
        />
        <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="300">
          <div className="section-header">
            <h2>Upcoming</h2>
            <NavLink to="/my-jobs/day-jobs">See all</NavLink>
          </div>
          {day.upcoming.length > 0 ? (
            <JobsList jobs={day.upcoming} />
          ) : (
            <p>No upcoming jobs.</p>
          )}
        </Card>
        <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
          <div className="section-header">
            <h2>Pending</h2>
            <NavLink to="/my-jobs/day-jobs">See all</NavLink>
          </div>
          {day.pending.length > 0 ? (
            <JobsList jobs={day.pending} />
          ) : (
            <p>No pending jobs.</p>
          )}
        </Card>
        <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="500">
          <div className="section-header">
            <h2>Previous</h2>
            <NavLink to="/my-jobs/day-jobs">See all</NavLink>
          </div>
          {day.previous.length > 0 ? (
            <JobsList jobs={day.previous} />
          ) : (
            <p>No previous jobs.</p>
          )}
        </Card>
      </div>
    );
  else if (pathname.includes("part-time"))
    return (
      <div className="my-jobs-content">
        <Header
          data-aos="fade-up"
          data-aos-once={true}
          data-aos-delay="200"
          data={part}
          pathname={pathname}
        />
        <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="300">
          <div className="section-header">
            <h2>Offers</h2>
            <NavLink to="/my-jobs/day-jobs">See all</NavLink>
          </div>
        </Card>
        <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
          <div className="section-header">
            <h2>Applied</h2>
            <NavLink to="/my-jobs/day-jobs">See all</NavLink>
          </div>
        </Card>
        <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="500">
          <div className="section-header">
            <h2>Watchlist</h2>
            <NavLink to="/my-jobs/day-jobs">See all</NavLink>
          </div>
        </Card>
      </div>
    );
  else if (pathname.includes("full-time"))
    return (
      <div className="my-jobs-content">
        <Header
          data-aos="fade-up"
          data-aos-once={true}
          data-aos-delay="200"
          data={full}
          pathname={pathname}
        />
        <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="300">
          <div className="section-header">
            <h2>Offers</h2>
            <NavLink to="/my-jobs/day-jobs">See all</NavLink>
          </div>
        </Card>
        <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
          <div className="section-header">
            <h2>Applied</h2>
            <NavLink to="/my-jobs/day-jobs">See all</NavLink>
          </div>
        </Card>
        <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="500">
          <div className="section-header">
            <h2>Watchlist</h2>
            <NavLink to="/my-jobs/day-jobs">See all</NavLink>
          </div>
        </Card>
      </div>
    );
  return null;
}

export default Jobs;
