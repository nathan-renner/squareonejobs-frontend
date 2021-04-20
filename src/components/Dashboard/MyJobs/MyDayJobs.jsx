import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Card from "../../Card";
import Header from "./Header";
import JobsList from "../../JobsList";
import Button from "./../../Button";
import ActivityIndicator from "./../../ActivityIndicator";
import useApi from "./../../../hooks/useApi";
import Modal from "./../../Modal";
import Listing from "./../../../views/dashboard/Listing";
import { getMyJobs } from "../../../api/listings";

function MyDayJobs(props) {
  const history = useHistory();
  const getMyJobsApi = useApi(getMyJobs);
  const [dayJobs, setDayJobs] = useState(false);
  const [selectedJob, setSelectedJob] = useState(false);

  const fetchJobs = async () => {
    const response = await getMyJobsApi.request("day");
    if (response.ok) setDayJobs(response.data);
  };

  useEffect(() => {
    if (!dayJobs && !getMyJobsApi.error) fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-jobs-content">
      <ActivityIndicator visible={getMyJobsApi.loading} />
      <Modal
        className="nopadding"
        visible={selectedJob}
        Content={Listing}
        onCancel={() => setSelectedJob(false)}
        componentProps={{
          modal: true,
          id: selectedJob,
          onExit: () => setSelectedJob(false),
        }}
      />
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
              </div>
              <JobsList
                type="upcoming"
                jobs={dayJobs.upcoming}
                showJobModal={setSelectedJob}
              />
            </Card>
          )}
          {dayJobs.pending.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
              <div className="section-header">
                <h2>Pending</h2>
              </div>
              <JobsList type="pending" jobs={dayJobs.pending} />
            </Card>
          )}
          {dayJobs.previous.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="500">
              <div className="section-header">
                <h2>Previous</h2>
                {/* <NavLink to="/my-jobs/day-jobs">See all</NavLink> */}
              </div>
              <JobsList type="previous" jobs={dayJobs.previous} />
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
