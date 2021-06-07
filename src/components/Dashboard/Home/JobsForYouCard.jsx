import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import Card from "../../Card";
import MultiButton from "../../MultiButton";
import Button from "./../../Button";
import ActivityIndicator from "./../../ActivityIndicator";
import useApi from "./../../../hooks/useApi";

import { getRecommended } from "../../../api/listings";
import { useResponseModal } from "./../../../hooks/useResponseModal";

const buttons = ["Day Jobs", "Full Time", "Part Time"];

function JobsForYouCard({ jobs: day, onSelect, ...props }) {
  const [activeButton, setActiveButton] = useState(0);
  const [part, setPart] = useState(false);
  const [full, setFull] = useState(false);
  const [jobs, setJobs] = useState(day);
  const getRecommendedApi = useApi(getRecommended);
  const { setModal } = useResponseModal();
  const history = useHistory();

  useEffect(async () => {
    if (activeButton === 0) setJobs([...day]);
    else if (activeButton === 1) {
      if (!full) {
        const res = await fetchListings("full");
        setJobs(res);
      } else setJobs([...full]);
    } else if (activeButton === 2) {
      if (!part) {
        const res = await fetchListings("part");
        setJobs(res);
      } else setJobs([...part]);
    }
    //eslint-disable-next-line
  }, [activeButton]);
  const fetchListings = async (type) => {
    const response = await getRecommendedApi.request(type);
    if (response.ok) {
      type === "full" ? setFull(response.data) : setPart(response.data);
      return response.data;
    } else
      setModal({
        type: "error",
        header: "Something went wrong.",
        body: response.data,
      });
  };

  const onSeeMore = () => {
    history.push("/search", { search: "Jobs for you" });
  };

  return (
    <Card className="recommended-jobs-card" {...props}>
      <div className="header">
        <h2>Jobs for you</h2>
        <p onClick={onSeeMore}>See more</p>
      </div>
      <div className="selectors">
        <MultiButton
          className="filter"
          buttons={buttons}
          active={activeButton}
          onClick={setActiveButton}
        />
      </div>
      <div className="jobs-container">
        {jobs.length > 0 ? (
          jobs.map((job) => {
            const {
              position,
              startDateTime,
              endDateTime,
              location: loc,
            } = job.details;
            return (
              <div
                className="job"
                key={job._id}
                onClick={() => onSelect(job._id)}
              >
                <img src={job.company.logo} alt="Logo" />
                <div className="details-container">
                  <p>{moment(startDateTime).format("MM/DD/YYYY")}</p>
                  <h3>{position}</h3>
                </div>
                <div className="details-container">
                  <p>
                    {moment(startDateTime).format("LT") +
                      " - " +
                      moment(endDateTime).format("LT")}
                  </p>
                  <p>{`${loc.street}, ${loc.city}, ${loc.state} ${loc.zip}`}</p>
                </div>
                <Button
                  label="View"
                  color="transparent"
                  outline
                  textColor="primary"
                />
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center", marginTop: "4em" }}>
            No {buttons[activeButton]} Jobs.
          </p>
        )}
      </div>
      <ActivityIndicator visible={getRecommended.loading} />
    </Card>
  );
}

export default JobsForYouCard;
