import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Card from "../../Card";
import Header from "./Header";
import JobsList from "../../JobsList";
import Button from "./../../Button";
import useApi from "./../../../hooks/useApi";
import ActivityIndicator from "./../../ActivityIndicator";
import { getMyJobs } from "./../../../api/listings";
import Modal from "./../../Modal";
import Listing from "../../../views/dashboard/Listing";
import { useResponseModal } from "./../../../hooks/useResponseModal";

function MyFullTime(props) {
  const history = useHistory();
  const getMyJobsApi = useApi(getMyJobs);
  const [fullTime, setFullTime] = useState(false);
  const [selectedJob, setSelectedJob] = useState(false);
  const { setModal } = useResponseModal();

  const fetchJobs = async () => {
    const response = await getMyJobsApi.request("full");
    if (response.ok) setFullTime(response.data);
    else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  useEffect(() => {
    if (!fullTime && !getMyJobsApi.error) fetchJobs();
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
                <h2>Offers</h2>
              </div>
              <JobsList jobs={fullTime.offers} showJobModal={setSelectedJob} />
            </Card>
          )}
          {fullTime.applied.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
              <div className="section-header">
                <h2>Applied</h2>
              </div>
              <JobsList jobs={fullTime.applied} showJobModal={setSelectedJob} />
            </Card>
          )}
          {/* {fullTime.watchlist.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="500">
              <div className="section-header">
                <h2>Previous</h2>
                <NavLink to="/my-jobs/day-jobs">See all</NavLink>
              </div>
              <JobsList jobs={fullTime.watchlist} />
            </Card>
          )} */}
          {fullTime.offers.length === 0 && fullTime.applied.length === 0 && (
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
