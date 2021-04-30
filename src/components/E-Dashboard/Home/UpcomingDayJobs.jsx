import React, { useState } from "react";
import moment from "moment";
import { MdPerson } from "react-icons/md";

function UpcomingDayJobs({ ...props }) {
  const [upcomingJobs] = useState([
    {
      _id: 1,
      position: "Box Mover",
      startDateTime: moment(),
      candidateHired: { firstName: "John", lastName: "Smith" },
    },
  ]);

  const renderJobs = () => {
    return upcomingJobs.splice(0, 3).map((job) => (
      <div className="u-job" key={job._id}>
        <p className="date">{moment(job.startDateTime).calendar()}</p>
        <h4>{job.position}</h4>
        <div className="worker">
          <MdPerson size={20} color="1d8cf8" />
          <p>
            {`${job.candidateHired.firstName} ${job.candidateHired.lastName}`}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="card upcoming-jobs" {...props}>
      <h2>Upcoming Day Jobs</h2>
      {upcomingJobs.length !== 0 ? (
        <>{renderJobs()}</>
      ) : (
        <p style={{ marginBottom: 0 }}>No upcoming jobs</p>
      )}
    </div>
  );
}

export default UpcomingDayJobs;
