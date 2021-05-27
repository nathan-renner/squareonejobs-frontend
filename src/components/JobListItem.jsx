import React from "react";
import moment from "moment";
import { MdCheck, MdClear, MdErrorOutline, MdLibraryAdd } from "react-icons/md";
import Icon from "./Icon";
import { useHistory } from "react-router-dom";
import OptionsDropdown from "./OptionsDropdown";
import Button from "./Button";
import useApi from "./../hooks/useApi";
import { useResponseModal } from "./../hooks/useResponseModal";
import {
  acceptOffer,
  completeListing,
  declineOffer,
  saveListing,
  unsaveListing,
  withdrawListing,
} from "../api/listings";

function JobListItem({
  job: listing,
  showJobModal = () => true,
  saved = false,
  offers = false,
  refreshListings = () => true,
}) {
  const history = useHistory();
  const completeListingApi = useApi(completeListing);
  const withdrawAppApi = useApi(withdrawListing);
  const saveListingApi = useApi(saveListing);
  const unsaveListingApi = useApi(unsaveListing);
  const acceptOfferApi = useApi(acceptOffer);
  const declineOfferApi = useApi(declineOffer);
  const { setModal } = useResponseModal();

  const handleComplete = async () => {
    const response = await completeListingApi.request(listing._id);
    if (response.ok) {
      refreshListings();
      setModal({
        type: "success",
        header: "Job marked as complete!",
        body: "Now, sit tight and wait for your employer to verify and finalize the transaction.",
      });
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  const handleWithdraw = async () => {
    const result = window.confirm(
      `Are you sure you want to withdraw your application for "${listing.details.position}"?`
    );
    if (result) {
      const response = await withdrawAppApi.request(listing._id);
      if (response.ok) {
        refreshListings();
        setModal({
          type: "success",
          header: "Application Withdrawn",
        });
      } else
        setModal({
          type: "error",
          header: "Something went wrong",
          body: response.data,
        });
    }
  };

  const handleSaved = async () => {
    const result = window.confirm(
      `Are you sure you want to unsave "${listing.details.position}"?`
    );
    if (result) {
      const api = saved || listing.saved ? unsaveListingApi : saveListingApi;
      const response = await api.request(listing._id);
      if (response.ok) {
        refreshListings();
        if (saved)
          setModal({
            type: "success",
            header: "Listing unsaved",
          });
        else
          setModal({
            type: "success",
            header: !listing.saved ? "Listing saved!" : "Listing unsaved",
            body: !listing.saved
              ? 'You can find this listing in the My Jobs tab under "Saved Listings"'
              : "",
          });
      } else
        setModal({
          type: "error",
          header: "Something went wrong",
          body: response.data,
        });
    }
  };

  const handleAcceptOffer = async () => {
    const result = window.confirm(
      `About to accept "${listing.details.position}" at ${listing.company.name}`
    );
    if (result) {
      const response = await acceptOfferApi.request(listing._id);
      if (response.ok) {
        refreshListings();
        setModal({
          type: "success",
          header: "Congratulations!",
          body: "Nice work on getting a new job!",
        });
      } else
        setModal({
          type: "error",
          header: "Something went wrong",
          body: response.data,
        });
    }
  };

  const handleDeclineOffer = async () => {
    const result = window.confirm(
      `Are you sure you want to decline your offer for "${listing.details.position}" at ${listing.company.name}`
    );
    if (result) {
      const response = await declineOfferApi.request(listing._id);
      if (response.ok) {
        refreshListings();
        setModal({
          type: "success",
          header: "Offer Declined.",
          body: "Don't worry, you'll find a job that's right for you soon enough!",
        });
      } else
        setModal({
          type: "error",
          header: "Something went wrong",
          body: response.data,
        });
    }
  };

  const getOptions = () => {
    const options = [];

    if (listing.status === "in-progress" && offers) {
      options.push({
        name: "Accept Offer",
        onClick: () => handleAcceptOffer(),
      });
      options.push({
        name: "Decline Offer",
        onClick: () => handleDeclineOffer(),
      });
    }
    if (
      listing.type === "day" &&
      listing.status === "active" &&
      moment(listing.details.endDateTime).isAfter(moment())
    )
      options.push({
        name: "Mark Job as Complete",
        onClick: () => handleComplete(),
      });
    options.push({
      name: "View Listing",
      onClick: () => showJobModal(listing._id),
    });
    if (
      listing.status === "active" &&
      moment(listing.details.startDateTime).diff(moment(), "days") > 1
    )
      options.push({
        name: "Withdraw Application",
        onClick: () => handleWithdraw(),
      });
    options.push({
      name: "Go to Listing Page",
      onClick: () => history.push(`/listing/${listing._id}`),
    });
    return options;
  };

  const renderStatus = () => {
    const statusText =
      listing.status.charAt(0).toUpperCase() +
      listing.status.slice(1).replaceAll("-", " ");
    if (
      listing.status === "pending-completion" ||
      listing.status === "pending-cancellation"
    ) {
      return (
        <div className="status">
          <Icon Icon={MdErrorOutline} size={25} color="yellow" />
          <p className="text">{statusText}</p>
        </div>
      );
    } else if (listing.status === "in-progress" && offers) {
      return (
        <div className="status">
          <Icon Icon={MdErrorOutline} size={25} color="yellow" />
          <p className="text">Job Offer Received</p>
        </div>
      );
    } else if (listing.status === "cancelled") {
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
      <img src={listing.company.logo} alt="Logo" />
      <div
        className="details-container pointer"
        onClick={() => showJobModal(listing._id)}
      >
        {renderStatus()}
        <h3>{listing.details.position}</h3>
        <p>{moment(listing.details.startDateTime).format("MM/DD/YYYY")}</p>
        {!saved && listing.status === "pending-completion" && (
          <Button
            label="Mark as Complete"
            onClick={() => handleComplete()}
            color="yellow"
          />
        )}
        {listing.status === "in-progress" && offers && (
          <Button
            label="Accept Offer"
            onClick={() => handleAcceptOffer()}
            color="yellow"
          />
        )}
      </div>
      <div className="details-container">
        <p>
          {moment(listing.details.startDateTime).format("LT") +
            " - " +
            moment(listing.details.endDateTime).format("LT")}
        </p>
        <p>{`${listing.details.location.street}, ${listing.details.location.city}, ${listing.details.location.state} ${listing.details.location.zip}`}</p>
      </div>
      <div className="options-child">
        {saved && (
          <Icon
            className="saved"
            Icon={MdLibraryAdd}
            size={30}
            sizeFactor={0.7}
            color="transparent"
            iconColor="secondary"
            onClick={handleSaved}
          />
        )}
        <OptionsDropdown
          options={
            saved
              ? [
                  {
                    name: "View Listing",
                    onClick: () => showJobModal(listing._id),
                  },
                ]
              : getOptions()
          }
        />
      </div>
      {/* {comps.buttons} */}
    </div>
  );
}

export default JobListItem;
