import React from "react";
import moment from "moment";
import {
  MdAccessTime,
  MdCreditCard,
  MdHome,
  MdLocationOn,
} from "react-icons/md";
import Skeleton from "react-loading-skeleton";

import NumberFormat from "react-number-format";
import GoogleMaps from "../../../components/GoogleMaps";

function Listing({ listing, map = true }) {
  const renderType = () => {
    if (listing.type === "day") return "Day Job";
    else if (listing.type === "part") return "Part Time";
    else if (listing.type === "full") return "Full Time";
  };

  return (
    <div className={`listing`}>
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
                lng: listing.details.location.coordinates[0],
                lat: listing.details.location.coordinates[1],
              }}
            />
          )}
          <div className="content">
            <div className="l-header">
              <div className="left">
                {/* <img
                  src={listing.company.logo}
                  alt={`${listing.company.name}'s logo`}
                  className="logo"
                /> */}
                <div>
                  <p>
                    {moment(listing.details.startDateTime).format("MM/DD/YYYY")}
                  </p>
                  <h2>{listing.details.position}</h2>
                </div>
              </div>
              <p>{renderType()}</p>
            </div>
            <div className="l-content">
              {listing.details.endDateTime && (
                <div className="detail">
                  <MdAccessTime className="icon" size={25} />
                  <p>
                    {moment(listing.details.startDateTime).format("LT") +
                      " - " +
                      moment(listing.details.endDateTime).format("LT")}
                  </p>
                </div>
              )}
              {
                <div className="detail">
                  <MdLocationOn className="icon" size={25} />
                  <p>
                    {`${`${listing.details.location.street}, ${listing.details.location.city}, ${listing.details.location.state} ${listing.details.location.zip}`}`}
                  </p>
                </div>
              }
              {listing.details.wage && (
                <div className="detail">
                  <MdCreditCard className="icon" size={25} />
                  <NumberFormat
                    decimalScale={2}
                    fixedDecimalScale={true}
                    value={listing.details.wage}
                    displayType={"text"}
                    prefix={"$"}
                    allowNegative={false}
                    renderText={(value) => <p>{value}</p>}
                  />
                </div>
              )}
              {listing.details.salary && (
                <div className="detail">
                  <MdCreditCard className="icon" size={25} />
                  <p>{listing.details.salary}</p>
                </div>
              )}
              {listing.details.remote && (
                <div className="detail">
                  <MdHome className="icon" size={25} />
                  <p>Remote work</p>
                </div>
              )}
              <>
                {listing.details.qualifications && (
                  <>
                    <h3>Qualifications</h3>
                    {listing.details.qualifications.driversLicense && (
                      <p>
                        <b>Driver's License Required</b>
                      </p>
                    )}
                    {listing.details.qualifications.other && (
                      <p>
                        <b>Other qualifications:</b>{" "}
                        {listing.details.qualifications.other}
                      </p>
                    )}
                  </>
                )}
                {listing.details.description && (
                  <>
                    <h3>Description</h3>
                    <p>{listing.details.description}</p>
                  </>
                )}
                {listing.details.benefits && (
                  <>
                    <h3>Benefits</h3>
                    <p>{listing.details.benefits}</p>
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
