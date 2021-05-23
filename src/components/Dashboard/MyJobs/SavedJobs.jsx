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
import { useResponseModal } from "./../../../hooks/useResponseModal";

function SavedJobs(props) {
  const history = useHistory();
  const getMyJobsApi = useApi(getMyJobs);
  const [saved, setSaved] = useState(false);
  const [selectedJob, setSelectedJob] = useState(false);
  const { setModal } = useResponseModal();

  const fetchJobs = async () => {
    const response = await getMyJobsApi.request("saved");
    if (response.ok) setSaved(response.data);
    else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  useEffect(() => {
    if (!saved && !getMyJobsApi.error) fetchJobs();
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
      {saved && (
        <>
          <Header
            data-aos="fade-up"
            data-aos-once={true}
            data-aos-delay="100"
            data={saved}
          />
          {saved.day.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="300">
              <div className="section-header">
                <h2>Day Listings</h2>
              </div>
              <JobsList jobs={saved.day} showJobModal={setSelectedJob} />
            </Card>
          )}
          {saved.part.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
              <div className="section-header">
                <h2>Part time Listings</h2>
              </div>
              <JobsList jobs={saved.part} showJobModal={setSelectedJob} />
            </Card>
          )}
          {saved.full.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="500">
              <div className="section-header">
                <h2>Full Time Listings</h2>
                {/* <NavLink to="/my-jobs/day-jobs">See all</NavLink> */}
              </div>
              <JobsList jobs={saved.full} showJobModal={setSelectedJob} />
            </Card>
          )}
          {saved.day.length === 0 &&
            saved.part.length === 0 &&
            saved.full.length === 0 && (
              <Card
                data-aos="fade-up"
                data-aos-once={true}
                data-aos-delay="300"
                className="no-jobs-card"
              >
                <h2>No saved listings</h2>
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

export default SavedJobs;
