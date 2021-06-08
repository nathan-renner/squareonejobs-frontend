import React from "react";

import JobListItem from "./JobListItem";

function JobsList({ jobs, ...otherProps }) {
  return (
    <div className="jobs-container">
      {jobs.map((job, index) => (
        <JobListItem job={job} key={index} {...otherProps} />
      ))}
    </div>
  );
}

export default JobsList;
