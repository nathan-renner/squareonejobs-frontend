import React from "react";
import moment from "moment";
import { MdCheck, MdClear, MdErrorOutline } from "react-icons/md";
import Icon from "./Icon";
// import Button from "./Button";
// import Icon from "./Icon";
// import { BsExclamation } from "react-icons/bs";
// import { HiCheck } from "react-icons/hi";
import OptionsDropdown from "./OptionsDropdown";
import Button from "./Button";

function JobListItem({ job, showJobModal = () => true }) {
  const handleComplete = () => {};

  const handleWithdraw = () => {};

  const getOptions = () => {
    const options = [];

    if (
      job.type === "day" &&
      job.status === "active" &&
      moment(job.details.endDateTime).isAfter(moment())
    )
      options.push({
        name: "Mark Job as Complete",
        onClick: () => handleComplete(),
      });
    options.push({
      name: "View Listing",
      onClick: () => showJobModal(job._id),
    });
    if (
      job.status === "active" &&
      moment(job.details.startDateTime).diff(moment(), "days") > 1
    )
      options.push({
        name: "Withdraw Application",
        onClick: () => handleWithdraw(),
      });

    return options;
  };

  const renderStatus = () => {
    const statusText =
      job.status.charAt(0).toUpperCase() +
      job.status.slice(1).replaceAll("-", " ");
    if (
      job.status === "pending-completion" ||
      job.status === "pending-cancellation"
    ) {
      return (
        <div className="status">
          <Icon Icon={MdErrorOutline} size={25} color="yellow" />
          <p className="text">{statusText}</p>
        </div>
      );
    } else if (job.status === "cancelled") {
      return (
        <div className="status">
          <Icon Icon={MdClear} size={25} color="danger" />
          <p className="text">{statusText}</p>
        </div>
      );
    } else {
      return (
        <div className="status">
          <Icon Icon={MdCheck} size={25} color="primary" />
          <p className="text">{statusText}</p>
        </div>
      );
    }
  };

  return (
    <div className="job">
      <img src={job.company.logo} alt="Logo" />
      <div
        className="details-container pointer"
        onClick={() => showJobModal(job._id)}
      >
        {renderStatus()}
        <h3>{job.details.position}</h3>
        <p>{moment(job.details.startDateTime).format("MM/DD/YYYY")}</p>
        {job.status === "pending-completion" ? (
          <Button
            label="Mark as Complete"
            onClick={() => handleComplete(job._id)}
            color="yellow"
          />
        ) : null}
      </div>
      <div className="details-container">
        <p>
          {moment(job.details.startDateTime).format("LT") +
            " - " +
            moment(job.details.endDateTime).format("LT")}
        </p>
        <p>{`${job.details.location.street}, ${job.details.location.city}, ${job.details.location.state} ${job.details.location.zip}`}</p>
      </div>
      <div className="options-child">
        <OptionsDropdown options={getOptions()} />
      </div>
      {/* {comps.buttons} */}
    </div>
  );
}

export default JobListItem;
