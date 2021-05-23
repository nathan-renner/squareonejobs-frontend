import React, { useEffect, useState } from "react";
import moment from "moment";
import { MdAccessTime, MdCreditCard, MdLocationOn } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

import Button from "./../../components/Button";
import NumberFormat from "react-number-format";

import useApi from "./../../hooks/useApi";
import { getListing } from "../../api/listings";
import { useSuccessScreen } from "../../hooks/useSuccessScreen";
import { applyToDayJob } from "./../../api/listings";
import useAuth from "./../../auth/useAuth";
import GoogleMaps from "../../components/GoogleMaps";
import { useResponseModal } from "./../../hooks/useResponseModal";

function Listing({
  id = false,
  modal = false,
  onApplyDone = () => true,
  map = true,
}) {
  const [listing, setListing] = useState(false);
  const { user } = useAuth();
  const listingApi = useApi(getListing);
  const applyApi = useApi(applyToDayJob);
  const { showSuccess } = useSuccessScreen();
  const [isWinner, setIsWinner] = useState(false);
  const { details } = listing;
  const { setModal } = useResponseModal();

  const fetchListing = async () => {
    setListing(false);
    const response = await listingApi.request(id);
    if (response.ok) {
      setListing(response.data);
      setIsWinner(response.data.winner === user._id);
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

  const onApply = async () => {
    const response = await applyApi.request(id);
    if (response.ok) {
      showSuccess();
      onApplyDone(id);
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
      });
  };

  const renderButton = () => {
    if (!listing.winner) return <Button label="Apply" onClick={onApply} />;
    else {
      if (isWinner) {
        return <Button label="IsWinner" />;
      }
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
                  <p>{moment(details.startDateTime).format("MM/DD/YYYY")}</p>
                  <h2>{details.position}</h2>
                </div>
              </div>
              <div>{renderButton()}</div>
            </div>
            <div className="l-content">
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
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Listing;
