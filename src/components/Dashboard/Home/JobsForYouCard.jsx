import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import Card from "../../Card";
import MultiButton from "../../MultiButton";
import Button from "./../../Button";

const buttons = ["Day Jobs", "Full Time", "Part Time"];

function JobsForYouCard({ jobs, onSelect, ...props }) {
  const [activeButton, setActiveButton] = useState(0);
  const history = useHistory();

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
        {jobs.map((job) => (
          <div className="job" key={job._id} onClick={() => onSelect(job._id)}>
            <img src={job.company.logo} alt="Logo" />
            <div className="details-container">
              <p>{moment(job.startDateTime).format("MM/DD/YYYY")}</p>
              <h3>{job.position}</h3>
            </div>
            <div className="details-container">
              <p>
                {moment(job.startDateTime).format("LT") +
                  " - " +
                  moment(job.endDateTime).format("LT")}
              </p>
              <p>{job.location}</p>
            </div>
            <Button label="apply" className="apply" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default JobsForYouCard;
