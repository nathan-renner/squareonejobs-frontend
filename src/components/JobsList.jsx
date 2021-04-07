import React from "react";
import moment from "moment";

function JobsList({ jobs, onClick }) {
  return (
    <div className="jobs-container">
      {jobs.map((job, index) => (
        <div className="job" key={index} onClick={() => onClick(job)}>
          {/* <img src={job.company.logo} alt="Logo" /> */}
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
        </div>
      ))}
    </div>
  );
}

export default JobsList;
