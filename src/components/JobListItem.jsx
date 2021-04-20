import React, { useEffect, useState } from "react";
import moment from "moment";
import Button from "./Button";
import Icon from "./Icon";
import { BsExclamation } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";

function JobListItem({ job, type = "", showJobModal = () => true }) {
  const [comps, setComps] = useState(false);

  useEffect(() => {
    setComps(renderComps);
    // eslint-disable-next-line
  }, []);

  const renderStatus = (text, icon, color) => {
    return (
      <div className="status">
        <Icon Icon={icon} size={25} color={color} />
        <p>{text}</p>
      </div>
    );
  };

  const renderButtons = (label1, onClick1, label2, onClick2) => {
    return (
      <div className="text-center" style={{ width: 150 }}>
        <Button label={label1} onClick={onClick1} />
        <Button
          label={label2}
          color="white"
          textColor="primary"
          outline
          onClick={onClick2}
        />
      </div>
    );
  };

  const renderComps = () => {
    switch (type) {
      case "pending":
        return {
          status: renderStatus("Waiting for Employer", BsExclamation, "yellow"),
          buttons: renderButtons(
            "View Job",
            () => showJobModal(job._id),
            "Withdraw Application",
            () => true
          ),
        };
      case "upcoming":
        return {
          status: renderStatus("Upcoming", HiCheck, "primary"),
          buttons: renderButtons(
            "View Job",
            () => showJobModal(job._id),
            "Cancel Job",
            () => true
          ),
        };
      case "previous":
        return {
          status: renderStatus(
            job.status === "completed" ? "Completed" : "Cancelled",
            HiCheck,
            "primary"
          ),
        };
      default:
        return null;
    }
  };

  return (
    <div className="job">
      <img src={job.company.logo} alt="Logo" />
      <div
        className="details-container pointer"
        onClick={() => showJobModal(job._id)}
      >
        <p>{moment(job.details.startDateTime).format("MM/DD/YYYY")}</p>
        <h3>{job.details.position}</h3>
        {/* {comps.status} */}
      </div>
      <div className="details-container">
        <p>
          {moment(job.details.startDateTime).format("LT") +
            " - " +
            moment(job.details.endDateTime).format("LT")}
        </p>
        <p>{`${job.details.location.street}, ${job.details.location.city}, ${job.details.location.state} ${job.details.location.zip}`}</p>
      </div>
      {/* {comps.buttons} */}
    </div>
  );
}

export default JobListItem;
