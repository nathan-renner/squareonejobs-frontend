import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ActivityIndicator, Button, Card, JobsList } from "../../common";

import Header from "./Header";
import useApi from "./../../../hooks/useApi";

import { getMyJobs } from "../../../api/listings";
import { useResponseModal } from "./../../../hooks/useResponseModal";

function MyPartTime(props) {
  const history = useHistory();
  const getMyJobsApi = useApi(getMyJobs);
  const [partTime, setPartTime] = useState(false);
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
              <JobsList jobs={partTime.offers} />
            </Card>
          )}
          {partTime.applied.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
              <div className="section-header">
                <h2>Pending</h2>
              </div>
              <JobsList jobs={partTime.applied} />
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
      <ActivityIndicator visible={getMyJobsApi.loading} />
    </div>
  );
}

export default MyPartTime;
