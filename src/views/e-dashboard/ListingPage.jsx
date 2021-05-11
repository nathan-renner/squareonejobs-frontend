import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import NumberFormat from "react-number-format";

import useApi from "./../../hooks/useApi";
import { getListing } from "./../../api/listings";

import MapImg from "../../assets/images/map.png";
import {
  MdAccessTime,
  MdLocationOn,
  MdCreditCard,
  MdCheck,
  MdErrorOutline,
  MdClear,
} from "react-icons/md";
import Button from "../../components/Button";
import UserCardList from "./../../components/UserCardList";
import UserCard from "../../components/UserCard";
import OptionsDropdown from "./../../components/OptionsDropdown";
import Icon from "./../../components/Icon";

function ListingPage(props) {
  const { id } = useParams();
  const history = useHistory();
  const getListingApi = useApi(getListing);
  const [listing, setListing] = useState(false);
  const { details } = listing;

  const fetchListing = async () => {
    const response = await getListingApi.request(id);
    if (response.ok) {
      setListing(response.data);
    }
  };

  useEffect(() => {
    if (!listing && !getListingApi.error) fetchListing();
    // eslint-disable-next-line
  }, []);

  const handleHireUser = async (id) => {
    console.log(id);
  };

  const getOptions = () => {
    const options = [];

    if (
      listing.status === "active" &&
      moment(details.startDateTime).diff(moment(), "hours") > 24
    )
      options.push({
        name: "Edit Listing",
        onClick: () => console.log("navigate to edit page"),
      });
    if (listing.status === "cancelled")
      options.push({
        name: "Delete Listing",
        onClick: () => console.log("Delete listing"),
      });
    if (listing.status === "active")
      options.push({
        name: "Cancel Listing",
        onClick: () => console.log("Cancel listing"),
      });
    if (listing.status === "pending-completion")
      options.push({
        name: "Mark Job as Complete",
        onClick: () => console.log("mark as complete"),
      });
    if (listing.status === "pending-cancellation")
      options.push({
        name: "Cancel Job",
        onClick: () => console.log("cancel job"),
      });

    return options;
  };

  const renderStatus = () => {
    const status =
      listing.status.charAt(0).toUpperCase() +
      listing.status.slice(1).replaceAll("-", " ");
    if (
      listing.status === "pending-completion" ||
      listing.status === "pending-cancellation"
    ) {
      return (
        <div className="status">
          <Icon Icon={MdErrorOutline} size={25} color="yellow" />
          <p>{status}</p>
        </div>
      );
    } else if (listing.status === "cancelled") {
      return (
        <div className="status">
          <Icon Icon={MdClear} size={25} color="danger" />
          <p>{status}</p>
        </div>
      );
    } else {
      return (
        <div className="status">
          <Icon Icon={MdCheck} size={25} color="primary" />
          <p>{status}</p>
        </div>
      );
    }
  };

  return (
    <div
      className="listing"
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <img src={MapImg} alt="Map of Manhattan" className="map" />
      <div className="content">
        {listing && (
          <>
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
                  <p>{moment(details.startDateTime).format("MM/DD/YYYY")}</p>
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
              </div>
              {getOptions().length > 0 && (
                <OptionsDropdown options={getOptions()} />
              )}
            </div>
            <div className="l-content">
              {listing.candidateHired && (
                <>
                  <h3>Candidate Hired</h3>
                  <UserCard
                    user={listing.candidateHired}
                    buttonLabel="View"
                    onButtonClick={() =>
                      history.push(`/user/${listing.candidateHired._id}`)
                    }
                  />
                </>
              )}
              <h3>Details</h3>
              {details.endDateTime && (
                <div className="detail">
                  <MdAccessTime className="icon" size={25} />
                  <p>
                    {moment(details.startDateTime).format("LT") +
                      " - " +
                      moment(details.endDateTime).format("LT")}
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
              <>
                {details.qualifications && (
                  <>
                    <h3>Qualification</h3>
                    {details.qualifications.driversLicense && (
                      <p>
                        <b>Driver's License Required:</b>{" "}
                        {details.qualifications.driversLicense}
                      </p>
                    )}
                    {details.qualifications.other && (
                      <p>
                        <b>Other qualifications:</b>{" "}
                        {details.qualifications.other}
                      </p>
                    )}
                  </>
                )}
                {details.description && (
                  <>
                    <h3>Description</h3>
                    <p>{details.description}</p>
                  </>
                )}
                {details.benefits && (
                  <>
                    <h3>Benefits</h3>
                    <p>{details.benefits}</p>
                  </>
                )}
              </>
              <h3>Applicants</h3>
              {listing.applicants ? (
                <UserCardList
                  users={listing.applicants}
                  buttonLabel={listing.candidateHired ? false : "Hire"}
                  onButtonClick={handleHireUser}
                />
              ) : (
                <p>No Applicants</p>
              )}
            </div>
          </>
        )}
        {!listing && !getListingApi.error && (
          <>
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
          </>
        )}
        {getListingApi.error && (
          <div className="error-container">
            <div>
              <h3>Error loading listing</h3>
              <Button label="retry" onClick={() => fetchListing()} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingPage;
