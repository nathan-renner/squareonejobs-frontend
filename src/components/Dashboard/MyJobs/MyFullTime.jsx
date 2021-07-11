import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ActivityIndicator, Button, Card, JobsList } from "../../common";

import Header from "./Header";
import useApi from "./../../../hooks/useApi";

import { getMyJobs } from "../../../api/listings";
import { useResponseModal } from "./../../../hooks/useResponseModal";

function MyFullTime(props) {
  const history = useHistory();
  const getMyJobsApi = useApi(getMyJobs);
  const [fullTime, setFullTime] = useState(false);
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
              <JobsList jobs={fullTime.offers} offers />
            </Card>
          )}
          {fullTime.applied.length > 0 && (
            <Card data-aos="fade-up" data-aos-once={true} data-aos-delay="400">
              <div className="section-header">
                <h2>Applied</h2>
              </div>
              <JobsList jobs={fullTime.applied} />
            </Card>
          )}
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
      <ActivityIndicator visible={getMyJobsApi.loading} />
    </div>
  );
}

export default MyFullTime;
