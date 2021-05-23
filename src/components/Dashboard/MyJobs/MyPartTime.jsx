import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Card from "../../Card";
import Header from "./Header";
import JobsList from "../../JobsList";
import Button from "./../../Button";
import { getMyJobs } from "../../../api/listings";
import ActivityIndicator from "./../../ActivityIndicator";
import useApi from "./../../../hooks/useApi";
import Modal from "./../../Modal";
import Listing from "../../../views/dashboard/Listing";
import { useResponseModal } from "./../../../hooks/useResponseModal";

function MyPartTime(props) {
  const history = useHistory();
  const getMyJobsApi = useApi(getMyJobs);
  const [partTime, setPartTime] = useState(false);
  const [selectedJob, setSelectedJob] = useState(false);
  const { setModal } = useResponseModal();

  const fetchJobs = async () => {
    const response = await getMyJobsApi.request("part");
    if (response.ok) setPartTime(response.data);
    else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  useEffect(() => {
    if (!partTime && !getMyJobsApi.error) fetchJobs();
    // eslint-disable-next-line
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
      {partTime && (
        <>
          <Header
            data-aos="fade-up"
            data-aos-once={true}
            data-aos-delay="100"
            data={partTime}
          />
          {partTime.offers.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="300">
              <div className="section-header">
                <h2>Upcoming</h2>
              </div>
              <JobsList jobs={partTime.offers} showJobModal={setSelectedJob} />
            </Card>
          )}
          {partTime.applied.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
              <div className="section-header">
                <h2>Pending</h2>
              </div>
              <JobsList jobs={partTime.applied} showJobModal={setSelectedJob} />
            </Card>
          )}
          {partTime.offers.length === 0 && partTime.applied.length === 0 && (
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
        </>
      )}
    </div>
  );
}

export default MyPartTime;
