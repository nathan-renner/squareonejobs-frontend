import React from "react";
import { Card } from "../../common";
import dayjs from "dayjs";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

function UpcomingJobs({ jobs, onSelect, ...props }) {
  const renderJobs = () => {
    return jobs.map((job) => {
      const { position, startDateTime, endDateTime } = job.details;
      return (
        <div
          className="job-container"
          key={job._id}
          onClick={() => onSelect(job._id)}
        >
          <img src={job.company.logo} alt="logo" />
          <div className="header">
            <p>{dayjs(startDateTime).format("MM/DD/YYYY")}</p>
            <h3>{position}</h3>
          </div>
          <p className="time">
            {dayjs(startDateTime).format("LT") +
              " - " +
              dayjs(endDateTime).format("LT")}
          </p>
        </div>
      );
    });
  };

  return (
    <Card className="upcoming-jobs-card" {...props}>
      <h2>This Week</h2>
      {jobs.length === 0 ? (
        <p style={{ marginBottom: 0 }}>No more jobs this week.</p>
      ) : (
        <>{renderJobs()}</>
      )}
    </Card>
  );
}

export default UpcomingJobs;
