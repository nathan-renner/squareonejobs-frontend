import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ActivityIndicator, Button, Card, JobsList } from "../../common";

import Header from "./Header";
import useApi from "./../../../hooks/useApi";

import { getMyJobs } from "../../../api/listings";
import { useResponseModal } from "./../../../hooks/useResponseModal";

function SavedJobs(props) {
  const history = useHistory();
  const getMyJobsApi = useApi(getMyJobs);
  const [saved, setSaved] = useState(false);
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
              <JobsList jobs={saved.day} saved refreshListings={fetchJobs} />
            </Card>
          )}
          {saved.part.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
              <div className="section-header">
                <h2>Part time Listings</h2>
              </div>
              <JobsList jobs={saved.part} saved refreshListings={fetchJobs} />
            </Card>
          )}
          {saved.full.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="500">
              <div className="section-header">
                <h2>Full Time Listings</h2>
                {/* <NavLink to="/my-jobs/day-jobs">See all</NavLink> */}
              </div>
              <JobsList jobs={saved.full} saved refreshListings={fetchJobs} />
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
      <ActivityIndicator visible={getMyJobsApi.loading} />
    </div>
  );
}

export default SavedJobs;
