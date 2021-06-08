import React from "react";
import moment from "moment";
import { MdPerson } from "react-icons/md";
import { NavLink } from "react-router-dom";

function UpcomingDayJobs({ jobs, ...props }) {
  const renderJobs = () => {
    return jobs.map((job) => (
      <div className="u-job" key={job._id}>
        <p className="date">{moment(job.details.startDateTime).calendar()}</p>
        <NavLink to={`/listing/${job._id}`} className="position">
          {job.details.position}
        </NavLink>
        {job.candidateHired ? (
          <div className="worker">
            {job.candidateHired.avatar ? (
              <img
                src={job.candidateHired.avatar}
                alt={`${job.candidateHired.firstName}'s avatar`}
              />
            ) : (
              <MdPerson size={20} color="1d8cf8" />
            )}
            <NavLink
              to={`/user/${job.candidateHired._id}`}
              className="username"
            >
              {`${job.candidateHired.firstName} ${job.candidateHired.lastName}`}
            </NavLink>
          </div>
        ) : (
          <p className="username">No candidate hired</p>
        )}
      </div>
    ));
  };

  return (
    <div className="card upcoming-jobs" {...props}>
      <h2>Upcoming Day Jobs</h2>
      {jobs.length > 0 ? (
        <>{renderJobs()}</>
      ) : (
        <p style={{ marginBottom: 0 }}>No upcoming jobs</p>
      )}
    </div>
  );
}

export default UpcomingDayJobs;
