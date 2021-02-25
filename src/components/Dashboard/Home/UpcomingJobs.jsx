import React from "react";
import Card from "../../Card";
import moment from "moment";

const jobs = [
  {
    _id: 0,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
  },
  {
    _id: 1,
    companyLogo:
      "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
    position: "Box Mover",
    startDateTime: moment(),
    endDateTime: moment().add(8, "hours"),
  },
];

function UpcomingJobs(props) {
  const renderJobs = () => {
    return jobs.map((job) => {
      return (
        <div className="job-container" key={job._id}>
          <img src={job.companyLogo} alt="logo" />
          <div className="header">
            <p>{moment(job.startDateTime).format("MM/DD/YYYY")}</p>
            <h3>{job.position}</h3>
          </div>
          <p className="time">
            {moment(job.startDateTime).format("LT") +
              " - " +
              moment(job.endDateTime).format("LT")}
          </p>
        </div>
      );
    });
  };

  return (
    <Card className="upcoming-jobs-card">
      <h2>Upcoming Jobs</h2>
      {renderJobs()}
    </Card>
  );
}

export default UpcomingJobs;
