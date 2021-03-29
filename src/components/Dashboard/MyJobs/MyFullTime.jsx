import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import Card from "../../Card";
import Header from "./Header";
import JobsList from "../../JobsList";
import Button from "./../../Button";
import useApi from "./../../../hooks/useApi";
import { getMyFullTime } from "../../../api/users";
import ActivityIndicator from "./../../ActivityIndicator";

const full = {
  offers: [],
  applied: [],
  watchlist: [],
};

function MyFullTime(props) {
  const history = useHistory();
  const myFullTimeApi = useApi(getMyFullTime);
  const [fullTime, setFullTime] = useState(false);

  const fetchJobs = async () => {
    const response = await myFullTimeApi.request();
    if (response.ok) setFullTime(response.data);
  };

  useEffect(() => {
    if (!fullTime && !myFullTimeApi.error) fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-jobs-content">
      <ActivityIndicator visible={myFullTimeApi.loading} />
      {fullTime && (
        <>
          <Header
            data-aos="fade-up"
            data-aos-once={true}
            data-aos-delay="100"
            data={fullTime}
          />
          {fullTime.offers.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="300">
              <div className="section-header">
                <h2>Upcoming</h2>
                <NavLink to="/my-jobs/day-jobs">See all</NavLink>
              </div>
              <JobsList jobs={fullTime.offers} />
            </Card>
          )}
          {fullTime.applied.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
              <div className="section-header">
                <h2>Pending</h2>
                <NavLink to="/my-jobs/day-jobs">See all</NavLink>
              </div>
              <JobsList jobs={fullTime.applied} />
            </Card>
          )}
          {fullTime.watchlist.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="500">
              <div className="section-header">
                <h2>Previous</h2>
                <NavLink to="/my-jobs/day-jobs">See all</NavLink>
              </div>
              <JobsList jobs={fullTime.watchlist} />
            </Card>
          )}
          {fullTime.offers.length === 0 &&
            fullTime.applied.length === 0 &&
            fullTime.watchlist.length === 0 && (
              <Card
                data-aos="fade-up"
                data-aos-once={true}
                data-aos-delay="300"
                className="no-jobs-card"
              >
                <h2>No full-time jobs</h2>
                <Button
                  label="Find full-time jobs"
                  onClick={() => history.push("/explore")}
                />
              </Card>
            )}
        </>
      )}
    </div>
  );
}

export default MyFullTime;
