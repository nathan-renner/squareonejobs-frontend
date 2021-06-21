import React from "react";
import { Card } from "./../../common";
import dayjs from "dayjs";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

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
        <p>{dayjs().format("MM/DD/YYYY")}</p>
      </div>
      <div className="job-container" onClick={() => onSelect(todaysJob._id)}>
        <img src={todaysJob.company.logo} alt="Listing" />
        <div className="details-container">
          <div>
            <h3>{position}</h3>
            {/* <Badge text={`+ ${points}`} /> */}
          </div>
          <p className="details">
            {dayjs(startDateTime).format("LT") +
              " - " +
              dayjs(endDateTime).format("LT")}
          </p>
          <p className="details">{`${loc.street}, ${loc.city}, ${loc.state} ${loc.zip}`}</p>
        </div>
      </div>
    </Card>
  );
}

export default TodaysJobCard;
