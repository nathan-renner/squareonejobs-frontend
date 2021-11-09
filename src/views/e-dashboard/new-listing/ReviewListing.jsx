import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import dayjs from "dayjs";
import {
  MdAccessTime,
  MdCreditCard,
  MdHome,
  MdLocationOn,
} from "react-icons/md";
import NumberFormat from "react-number-format";

import { Button } from "../../../components/common";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

function ReviewListing(props) {
  const history = useHistory();
  const { state: listing } = useLocation();

  const renderType = () => {
    if (listing.type === "day") return "Day Job";
    else if (listing.type === "part") return "Part Time";
    else if (listing.type === "full") return "Full Time";
  };

  return (
    <div className="post-listing">
      <div className="listing review-listing">
        <div className="content">
          <h1 className="title">Review Listing</h1>
          <hr />
          <div className="l-header">
            <div className="left">
              <div>
                <p>
                  {dayjs(listing.details.startDateTime).format("MM/DD/YYYY")}
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
                  {dayjs(listing.details.startDateTime).format("LT") +
                    " - " +
                    dayjs(listing.details.endDateTime).format("LT")}
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
              {listing.details.description && (
                <>
                  <h3>Description</h3>
                  <p className="chunk">{listing.details.description}</p>
                </>
              )}
              {(listing.details.qualifications.driversLicense ||
                listing.details.qualifications.other) && (
                <>
                  <h3>Qualifications</h3>
                  {listing.details.qualifications.driversLicense && (
                    <p style={{ fontWeight: 500 }}>Driver's License Required</p>
                  )}
                  {listing.details.qualifications.other && (
                    <p className="chunk">
                      {listing.details.qualifications.other}
                    </p>
                  )}
                </>
              )}
              {listing.details.benefits && (
                <>
                  <h3>Benefits</h3>
                  <p className="chunk">{listing.details.benefits}</p>
                </>
              )}
            </>
          </div>
          <hr />
          <div className="nav-controls">
            <Button
              outline
              textColor="primary"
              color="transparent"
              label="Back"
              onClick={() => history.replace("/new-listing", listing)}
            />
            <Button
              label="Proceed to Payment"
              onClick={() => history.push("/new-listing/payment", listing)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewListing;
