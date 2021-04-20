import React from "react";
import Card from "./../../Card";
import moment from "moment";
import Badge from "./../../Badge";

const listing = {
  companyLogo:
    "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
  position: "Box Mover",
  startDateTime: moment(),
  endDateTime: moment().add(8, "hours"),
  location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  points: 100000,
};

function TodaysJobCard({ todaysJob, onSelect, ...props }) {
  const {
    position,
    startDateTime,
    endDateTime,
    location: loc,
  } = todaysJob.details;
  return (
    <Card className="todays-job-card" {...props}>
      <div className="header">
        <h2>Today's Job</h2>
        <p>{moment().format("MM/DD/YYYY")}</p>
      </div>
      <div className="job-container" onClick={() => onSelect(todaysJob._id)}>
        <img src={todaysJob.company.logo} alt="Listing" />
        <div className="details-container">
          <div>
            <h3>{position}</h3>
            {/* <Badge text={`+ ${points}`} /> */}
          </div>
          <p className="details">
            {moment(startDateTime).format("LT") +
              " - " +
              moment(endDateTime).format("LT")}
          </p>
          <p className="details">{`${loc.street}, ${loc.city}, ${loc.state} ${loc.zip}`}</p>
        </div>
      </div>
    </Card>
  );
}

export default TodaysJobCard;
