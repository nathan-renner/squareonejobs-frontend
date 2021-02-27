import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

import Card from "../../Card";
import MultiButton from "../../MultiButton";
import Button from "./../../Button";

const buttons = ["Day Jobs", "Full Time", "Part Time"];

const jobs = [
  {
    _id: 0,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
    location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  },
  {
    _id: 1,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
    location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  },
  {
    _id: 2,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
    location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  },
  {
    _id: 3,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
    location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  },
  {
    _id: 4,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
    location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  },
  {
    _id: 5,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
    location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  },
];

function JobsForYouCard(props) {
  const [activeButton, setActiveButton] = useState(0);

  return (
    <Card className="recommended-jobs-card">
      <div className="header">
        <h2>Jobs for you</h2>
        <NavLink to="/">See more</NavLink>
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
          <div className="job">
            <img src={job.companyLogo} alt="Logo" />
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
