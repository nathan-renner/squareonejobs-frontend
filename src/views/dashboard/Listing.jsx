import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  MdAccessTime,
  MdCheck,
  MdClear,
  MdCreditCard,
  MdErrorOutline,
  MdHome,
  MdLibraryAdd,
  MdLocationOn,
} from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";

import {
  Button,
  GoogleMaps,
  Icon,
  Modal,
  OptionsDropdown,
} from "../../components/common";
import ReportModal from "./../../components/Dashboard/Listing/ReportModal";

import useApi from "./../../hooks/useApi";
import {
  getListing,
  completeListing,
  withdrawListing,
  saveListing,
  unsaveListing,
  acceptOffer,
  declineOffer,
} from "../../api/listings";
import { useSuccessScreen } from "../../hooks/useSuccessScreen";
import { applyToDayJob } from "./../../api/listings";
import { useResponseModal } from "./../../hooks/useResponseModal";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function Listing({
  id = false,
  modal = false,
  refreshListings = () => true,
  map = true,
}) {
  const history = useHistory();
  const [listing, setListing] = useState(false);
  const listingApi = useApi(getListing);
  const applyApi = useApi(applyToDayJob);
  const completeListingApi = useApi(completeListing);
  const withdrawAppApi = useApi(withdrawListing);
  const saveListingApi = useApi(saveListing);
  const unsaveListingApi = useApi(unsaveListing);
  const acceptOfferApi = useApi(acceptOffer);
  const declineOfferApi = useApi(declineOffer);
  const { showSuccess } = useSuccessScreen();
  const { details } = listing;
  const { setModal } = useResponseModal();
  const [reportModalVisible, setReportModalVisible] = useState(false);

  const fetchListing = async () => {
    setListing(false);
    const response = await listingApi.request(id);
    if (response.ok) {
      setListing(response.data);
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  useEffect(() => {
    if (id) {
      if ((!listing && !listingApi.error) || id !== listing._id) fetchListing();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleApply = async () => {
    const result = window.confirm(
      `About to apply to: "${listing.details.position}"`
    );
    if (result) {
      const response = await applyApi.request(id);
      if (response.ok) {
        showSuccess();
        refreshListings();
        fetchListing();
      } else
        setModal({
          type: "error",
          header: "Something went wrong",
          body: response.data,
        });
    }
  };

  const handleComplete = async () => {
    const response = await completeListingApi.request(listing._id);
    if (response.ok) {
      fetchListing();
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
        fetchListing();
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
    const api = listing.saved ? unsaveListingApi : saveListingApi;
    const response = await api.request(listing._id);
    if (response.ok) {
      setModal({
        type: "success",
        header: !listing.saved ? "Listing saved!" : "Listing unsaved",
        body: !listing.saved
          ? 'You can find this listing in the My Jobs tab under "Saved Listings"'
          : "",
      });
      setListing({ ...listing, saved: !listing.saved });
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
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
    if (
      listing.status === "in-progress" &&
      listing.isMyOffer &&
      !listing.isMyJob
    ) {
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
      listing.status === "in-progress" &&
      listing.isMyJob &&
      dayjs().isAfter(listing.details.endDateTime)
    )
      options.push({
        name: "Mark Job as Complete",
        onClick: () => handleComplete(),
      });
    if (
      listing.applied &&
      listing.status === "active" &&
      dayjs(listing.details.startDateTime).diff(dayjs(), "days") >= 1
    )
      options.push({
        name: "Withdraw Application",
        onClick: () => handleWithdraw(),
      });
    if (modal)
      options.push({
        name: "Go to Listing Page",
        onClick: () => history.push(`/listing/${listing._id}`),
      });
    options.push({
      name: "Report Listing",
      onClick: () => setReportModalVisible(true),
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
    } else if (listing.status === "in-progress" && listing.isMyOffer) {
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
    } else if (
      listing.status === "active" &&
      dayjs().isAfter(listing.details.startDateTime)
    ) {
      return (
        <div className="status">
          <Icon Icon={MdClear} size={25} color="danger" />
          <p className="text">Inactive Job</p>
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
    <div className={`listing ${modal ? "list-modal" : null}`}>
      {!listing ? (
        <div className="content">
          <div className="l-header">
            <div className="left">
              <Skeleton circle height={80} width={80} />
              <div>
                <p>
                  <Skeleton width={100} />
                </p>
                <h2>
                  <Skeleton width={150} />
                </h2>
              </div>
            </div>
          </div>
          <div className="l-content">
            <div className="detail">
              <Skeleton width={150} />
            </div>
            <div className="detail">
              <Skeleton width={200} />
            </div>
            <div className="detail">
              <Skeleton width={150} />
            </div>
            <Skeleton count={8} />
          </div>
        </div>
      ) : (
        <>
          {map && (
            <GoogleMaps
              coords={{
                lng: details.location.coordinates[0],
                lat: details.location.coordinates[1],
              }}
            />
          )}
          <div className="content">
            <div className="l-header">
              <div className="left">
                <img
                  src={listing.company.logo}
                  alt={`${listing.company.name}'s logo`}
                  className="logo"
                />
                <div>
                  {renderStatus()}
                  <h2>{details.position}</h2>
                  <p>{dayjs(details.startDateTime).format("MM/DD/YYYY")}</p>
                  <p>Posted {dayjs(listing.dateCreated).fromNow()}</p>
                  {listing.type === "day" &&
                    listing.status === "in-progress" &&
                    dayjs().isAfter(listing.details.endDateTime) && (
                      <Button
                        label="Mark as Complete"
                        onClick={() => handleComplete()}
                        color="yellow"
                      />
                    )}
                </div>
              </div>
              <div>
                <div className="icons">
                  <Icon
                    className="saved"
                    Icon={MdLibraryAdd}
                    size={30}
                    sizeFactor={0.7}
                    color="white"
                    iconColor={listing.saved ? "secondary" : "medium"}
                    onClick={handleSaved}
                  />
                  <OptionsDropdown options={getOptions()} />
                </div>
                <div>
                  {!listing.isMyJob && !listing.isMyOffer && (
                    <Button
                      label={listing.applied ? "Applied" : "Apply"}
                      onClick={handleApply}
                      disabled={
                        listing.applied ||
                        dayjs().isAfter(listing.details.startDateTime)
                      }
                    />
                  )}
                  {listing.status === "in-progress" &&
                    listing.isMyOffer &&
                    !listing.isMyJob && (
                      <Button
                        label="Accept Offer"
                        onClick={() => handleAcceptOffer()}
                        color="yellow"
                      />
                    )}
                </div>
              </div>
            </div>
            <div className="l-content">
              {details.endDateTime && (
                <div className="detail">
                  <MdAccessTime className="icon" size={25} />
                  <p>
                    {dayjs(details.startDateTime).format("LT") +
                      " - " +
                      dayjs(details.endDateTime).format("LT")}
                  </p>
                </div>
              )}
              {
                <div className="detail">
                  <MdLocationOn className="icon" size={25} />
                  <p>
                    {`${`${details.location.street}, ${details.location.city}, ${details.location.state} ${details.location.zip}`}`}
                  </p>
                </div>
              }
              {details.wage && (
                <div className="detail">
                  <MdCreditCard className="icon" size={25} />
                  <NumberFormat
                    decimalScale={2}
                    fixedDecimalScale={true}
                    value={details.wage}
                    displayType={"text"}
                    prefix={"$"}
                    allowNegative={false}
                    renderText={(value) => <p>{value}</p>}
                  />
                </div>
              )}
              {details.salary && (
                <div className="detail">
                  <MdCreditCard className="icon" size={25} />
                  <p>{details.salary}</p>
                </div>
              )}
              {details.remote && (
                <div className="detail">
                  <MdHome className="icon" size={25} />
                  <p>Remote work</p>
                </div>
              )}
              <>
                {details.description && (
                  <>
                    <h3>Description</h3>
                    <p className="chunk">{details.description}</p>
                  </>
                )}
                {details.qualifications && (
                  <>
                    <h3>Qualification</h3>
                    {details.qualifications.driversLicense && (
                      <p style={{ fontWeight: 500 }}>
                        Driver's License Required
                      </p>
                    )}
                    {details.qualifications.other && (
                      <p className="chunk">{details.qualifications.other}</p>
                    )}
                  </>
                )}
                {details.benefits && (
                  <>
                    <h3>Benefits</h3>
                    <p className="chunk">{details.benefits}</p>
                  </>
                )}
              </>
              <hr />
              <div className="company-info">
                <h3>About {listing.company.name}</h3>
                <p className="attr">Website: </p>
                <a
                  href={listing.company.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {listing.company.websiteUrl}
                </a>
                <p className="attr">Industry:</p>
                <p>{listing.company.industry}</p>
                <p className="attr">Size:</p>
                <p>{listing.company.size}</p>
                <p className="attr">Company Description:</p>
                <p>{listing.company.description}</p>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal
        visible={reportModalVisible}
        title="Report Listing"
        onCancel={() => setReportModalVisible(false)}
        Content={ReportModal}
        componentProps={{
          listingId: listing._id,
          setVisible: setReportModalVisible,
        }}
      />
    </div>
  );
}

export default Listing;
