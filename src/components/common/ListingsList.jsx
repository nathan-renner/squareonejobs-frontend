import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import moment from "moment";
import Button from "./Button";
import OptionsDropdown from "./OptionsDropdown";
import Icon from "./Icon";
import { MdCheck, MdClear, MdErrorOutline } from "react-icons/md";
import UserCard from "./UserCard";
import useApi from "./../../hooks/useApi";
import {
  deleteListing,
  cancelListing,
  completeListing,
} from "../../api/listings";

import defaultAvatar from "../../assets/images/default-avatar.png";

function ListingsList({
  listings,
  fetchJobs,
  setModal,
  setShowRef,
  drafts = false,
}) {
  const history = useHistory();
  const completeListingApi = useApi(completeListing);
  const cancelListingApi = useApi(cancelListing);
  const deleteListingApi = useApi(deleteListing);

  const handleDelete = async (_id, position) => {
    const result = window.confirm(
      `Are you sure you want to delete "${position}"?`
    );
    if (result) {
      const response = await deleteListingApi.request(_id);
      if (response.ok) {
        setModal({ type: "success", header: "Successfully Deleted" });
        fetchJobs();
      } else
        setModal({
          type: "error",
          header: "Something went wrong",
          body: response.data,
        });
    }
  };

  const handleCancel = async (_id, position) => {
    const result = window.confirm(
      `Are you sure you want to cancel "${position}"?`
    );
    if (result) {
      const response = await cancelListingApi.request(_id);
      if (response.ok) {
        setModal({ type: "success", header: "Successfully Cancelled" });
        fetchJobs();
      } else
        setModal({
          type: "error",
          header: "Something went wrong",
          body: response.data,
        });
    }
  };

  const handleComplete = async (_id) => {
    const response = await completeListingApi.request(_id);
    if (response.ok) {
      setShowRef(_id);
      fetchJobs();
      //setModal({ type: "success", header: "Job completed!" });
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  const getOptions = (status, startDateTime, _id, position, endDateTime) => {
    const options = [];

    if (status === "pending-completion" || moment().isAfter(endDateTime))
      options.push({
        name: "Mark Job as Complete",
        onClick: () => handleComplete(_id),
      });
    if (status !== "draft") {
      options.push({
        name: "View Listing",
        onClick: () => history.push(`/listing/${_id}`),
      });
    }
    if (
      status === "active" &&
      moment(startDateTime).diff(moment(), "hours") > 24
    )
      options.push({
        name: "Edit Listing",
        onClick: () => history.push(`/update-listing/${_id}`),
      });
    if (status === "draft") {
      options.push({
        name: "Edit Draft",
        onClick: () => history.push(`/new-listing`, _id),
      });
      options.push({
        name: "Delete Draft",
        onClick: () => handleDelete(_id, position),
      });
    }
    options.push({
      name: "Post Similar",
      onClick: () => history.push(`/new-listing`, { id: _id }),
    });
    if (status === "cancelled")
      options.push({
        name: "Delete Listing",
        onClick: () => handleDelete(_id, position),
      });
    if (status === "active" || status === "pending-cancellation")
      options.push({
        name: "Cancel Listing",
        onClick: () => handleCancel(_id, position),
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
            {listing.status === "pending-completion" ||
            moment().isAfter(listing.details.endDateTime) ? (
              <Button
                label="Mark as Complete"
                onClick={() => handleComplete(listing._id)}
                color="yellow"
              />
            ) : listing.status === "pending-cancellation" ? (
              <Button
                label="Cancel Job"
                onClick={() =>
                  handleCancel(listing._id, listing.details.position)
                }
                color="yellow"
              />
            ) : listing.status === "draft" ? (
              <Button
                label="Edit Draft"
                onClick={() => history.push(`/new-listing`, listing._id)}
                color="primary"
              />
            ) : null}
          </div>
          {!drafts && (
            <div className="user-section">
              {listing.candidateHired ? (
                <>
                  <p className="text">Candidate Hired</p>
                  <UserCard user={listing.candidateHired} />
                </>
              ) : listing.candidateGivenOffer ? (
                <>
                  <p className="text">Candidate Hired</p>
                  <UserCard user={listing.candidateGivenOffer} />
                </>
              ) : (
                <>
                  <p className="text">Applicants ({listing.applicants})</p>
                  <div
                    className="applicant-minis"
                    onClick={() => history.push(`/listing/${listing._id}`)}
                  >
                    {listing.applicantAvatars.map((a) => (
                      <img
                        src={a.avatar ? a.avatar : defaultAvatar}
                        alt="Applicant's avatar"
                        key={a._id}
                      />
                    ))}
                    <div className="extra">...</div>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="options-child">
            <OptionsDropdown
              options={getOptions(
                listing.status,
                listing.details.startDateTime,
                listing._id,
                listing.details.position,
                listing.details.endDateTime
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListingsList;
