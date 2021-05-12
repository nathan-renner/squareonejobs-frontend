import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import moment from "moment";
import Button from "./Button";
import OptionsDropdown from "./OptionsDropdown";
import Icon from "./Icon";
import { MdCheck, MdClear, MdErrorOutline } from "react-icons/md";
import UserCard from "./UserCard";

function ListingsList({ listings, drafts = false }) {
  const history = useHistory();

  const getOptions = (status, startDateTime, _id) => {
    const options = [
      {
        name: "View Listing",
        onClick: () => history.push(`/listing/${_id}`),
      },
    ];

    if (
      status === "active" &&
      moment(startDateTime).diff(moment(), "hours") > 24
    )
      options.push({
        name: "Edit Listing",
        onClick: () => console.log("navigate to edit page"),
      });
    if (status === "cancelled")
      options.push({
        name: "Delete Listing",
        onClick: () => console.log("Delete listing"),
      });
    if (status === "active")
      options.push({
        name: "Cancel Listing",
        onClick: () => console.log("Cancel listing"),
      });
    if (status === "pending-completion")
      options.push({
        name: "Mark Job as Complete",
        onClick: () => console.log("mark as complete"),
      });
    if (status === "pending-cancellation")
      options.push({
        name: "Cancel Job",
        onClick: () => console.log("cancel job"),
      });

    return options;
  };

  const renderStatus = (status) => {
    const statusText =
      status.charAt(0).toUpperCase() + status.slice(1).replaceAll("-", " ");
    if (status === "pending-completion" || status === "pending-cancellation") {
      return (
        <div className="status">
          <Icon Icon={MdErrorOutline} size={25} color="yellow" />
          <p className="text">{statusText}</p>
        </div>
      );
    } else if (status === "cancelled") {
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
    <div className="listings-list">
      {listings.map((listing) => (
        <div className="listing-item" key={listing._id}>
          <div className="left">
            {drafts && <p className="text">{listing.type.toUpperCase()}</p>}
            {renderStatus(listing.status)}
            <NavLink to={`/listing/${listing._id}`} className="header-link">
              {listing.details.position}
            </NavLink>
            <p className="text">
              {moment(listing.details.startDateTime).format("MM/DD/YYYY")}
            </p>
            {listing.type === "day" && (
              <p className="text">
                {moment(listing.details.startDateTime).format("LT") +
                  " - " +
                  moment(listing.details.endDateTime).format("LT")}
              </p>
            )}
            <p className="text">
              {`${`${listing.details.location.street}, ${listing.details.location.city}, ${listing.details.location.state} ${listing.details.location.zip}`}`}
            </p>
            {listing.status === "pending-completion" ? (
              <Button
                label="Mark as Complete"
                onClick={() => console.log("mark as complete")}
                color="yellow"
              />
            ) : listing.status === "pending-cancellation" ? (
              <Button
                label="Cancel Job"
                onClick={() => console.log("Cancel Job")}
                color="yellow"
              />
            ) : null}
          </div>
          <div className="user-section">
            {listing.candidateHired ? (
              <>
                <p className="text">Candidate Hired</p>
                <UserCard user={listing.candidateHired} />
              </>
            ) : (
              <p className="text">Applicants: {listing.applicants}</p>
            )}
          </div>
          <div className="options-child">
            <OptionsDropdown
              options={getOptions(
                listing.status,
                listing.details.startDateTime,
                listing._id
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListingsList;
