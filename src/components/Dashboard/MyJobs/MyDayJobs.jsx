import React, { useEffect, useState } from "react";
import moment from "moment";
import { NavLink, useHistory } from "react-router-dom";

import Card from "../../Card";
import Header from "./Header";
import JobsList from "../../JobsList";
import Button from "./../../Button";
import ActivityIndicator from "./../../ActivityIndicator";
import useApi from "./../../../hooks/useApi";
import { getMyDayJobs } from "./../../../api/users";

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

function MyDayJobs(props) {
  const history = useHistory();
  const myDayJobsApi = useApi(getMyDayJobs);
  const [dayJobs, setDayJobs] = useState(false);

  const fetchJobs = async () => {
    const response = await myDayJobsApi.request();
    if (response.ok) setDayJobs(response.data);
  };

  useEffect(() => {
    if (!dayJobs && !myDayJobsApi.error) fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-jobs-content">
      <ActivityIndicator visible={myDayJobsApi.loading} />
      {dayJobs && (
        <>
          <Header
            data-aos="fade-up"
            data-aos-once={true}
            data-aos-delay="100"
            data={dayJobs}
          />
          {dayJobs.upcoming.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="300">
              <div className="section-header">
                <h2>Upcoming</h2>
                <NavLink to="/my-jobs/day-jobs">See all</NavLink>
              </div>
              <JobsList jobs={dayJobs.upcoming} />
            </Card>
          )}
          {dayJobs.pending.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
              <div className="section-header">
                <h2>Pending</h2>
                <NavLink to="/my-jobs/day-jobs">See all</NavLink>
              </div>
              <JobsList jobs={dayJobs.pending} />
            </Card>
          )}
          {dayJobs.previous.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="500">
              <div className="section-header">
                <h2>Previous</h2>
                <NavLink to="/my-jobs/day-jobs">See all</NavLink>
              </div>
              <JobsList jobs={dayJobs.previous} />
            </Card>
          )}
          {dayJobs.upcoming.length === 0 &&
            dayJobs.pending.length === 0 &&
            dayJobs.previous.length === 0 && (
              <Card
                data-aos="fade-up"
                data-aos-once={true}
                data-aos-delay="300"
                className="no-jobs-card"
              >
                <h2>No day jobs</h2>
                <Button
                  label="Find day jobs"
                  onClick={() => history.push("/explore")}
                />
              </Card>
            )}
        </>
      )}
    </div>
  );
}

export default MyDayJobs;
