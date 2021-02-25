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

function TodaysJobCard(props) {
  return (
    <Card className="todays-job-card">
      <div className="header">
        <h2>Today's Job</h2>
        <p>{moment().format("MM/DD/YYYY")}</p>
      </div>
      <div className="job-container">
        <img src={listing.companyLogo} alt="Listing" />
        <div className="details-container">
          <div>
            <h3>{listing.position}</h3>
            <Badge text={`+ ${listing.points}`} />
          </div>
          <p className="details">
            {moment(listing.startDateTime).format("LT") +
              " - " +
              moment(listing.endDateTime).format("LT")}
          </p>
          <p className="details">{listing.location}</p>
        </div>
      </div>
    </Card>
  );
}

export default TodaysJobCard;
