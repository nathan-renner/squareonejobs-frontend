import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ActivityIndicator, Button, Card, JobsList, Modal } from "../../common";

import Header from "./Header";
import useApi from "./../../../hooks/useApi";
import Listing from "../../../views/dashboard/Listing";

import { getMyJobs } from "../../../api/listings";
import { useResponseModal } from "./../../../hooks/useResponseModal";

function MyDayJobs(props) {
  const history = useHistory();
  const getMyJobsApi = useApi(getMyJobs);
  const [dayJobs, setDayJobs] = useState(false);
  const [selectedJob, setSelectedJob] = useState(false);
  const { setModal } = useResponseModal();

  const fetchJobs = async () => {
    const response = await getMyJobsApi.request("day");
    if (response.ok) setDayJobs(response.data);
    else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  useEffect(() => {
    if (!dayJobs && !getMyJobsApi.error) fetchJobs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-jobs-content">
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
              <JobsList
                type="pending"
                jobs={dayJobs.pending}
                showJobModal={setSelectedJob}
              />
            </Card>
          )}
          {dayJobs.previous.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="500">
              <div className="section-header">
                <h2>Previous</h2>
                {/* <NavLink to="/my-jobs/day-jobs">See all</NavLink> */}
              </div>
              <JobsList
                type="previous"
                jobs={dayJobs.previous}
                showJobModal={setSelectedJob}
              />
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
      <Modal
        className="nopadding"
        visible={selectedJob}
        Content={Listing}
        onCancel={() => setSelectedJob(false)}
        listing
        componentProps={{
          modal: true,
          id: selectedJob,
          onExit: () => setSelectedJob(false),
          refreshListings: fetchJobs,
        }}
      />
      <ActivityIndicator visible={getMyJobsApi.loading} />
    </div>
  );
}

export default MyDayJobs;
