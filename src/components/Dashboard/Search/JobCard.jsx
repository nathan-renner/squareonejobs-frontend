import React from "react";
import dayjs from "dayjs";
import NumberFormat from "react-number-format";
import { MdAccessTime, MdCreditCard, MdLocationOn } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";

import { Card } from "../../common";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function JobCard({ listings, setSelected, selected }) {
  return (
    <>
      {listings.map((listing, index) => {
        const {
          position,
          startDateTime,
          endDateTime,
          location: loc,
          wage,
          salary,
        } = listing.details;
        return (
          <Card
            key={index}
            className={`${listing._id === selected ? "active" : null}`}
            onClick={() => setSelected(listing._id)}
          >
            <div className="card-header">
              <img
                src={listing.company.logo}
                alt={`${listing.company.name}'s logo`}
                className="logo"
              />
              <div>
                <h2>{position}</h2>
                <p className="small-text">{listing.company.name}</p>
                <p></p>
              </div>
              <h4 className="job-type">{listing.type.toUpperCase()}</h4>
            </div>
            {startDateTime && (
              <div className="detail">
                <IoMdCalendar className="icon" size={18} />
                <p>{dayjs(startDateTime).format("MM/DD/YYYY")}</p>
              </div>
            )}
            {endDateTime && (
              <div className="detail">
                <MdAccessTime className="icon" size={18} />
                <p>
                  {dayjs(startDateTime).format("LT") +
                    " - " +
                    dayjs(endDateTime).format("LT")}
                </p>
              </div>
            )}
            {loc && (
              <div className="detail">
                <MdLocationOn className="icon" size={18} />
                <p>{`${loc.street}, ${loc.city}, ${loc.state} ${loc.zip}`}</p>
              </div>
            )}
            {wage && (
              <div className="detail">
                <MdCreditCard className="icon" size={18} />
                <NumberFormat
                  decimalScale={2}
                  fixedDecimalScale={true}
                  value={wage}
                  displayType={"text"}
                  prefix={"$"}
                  allowNegative={false}
                  renderText={(value) => <p>{value}</p>}
                />
              </div>
            )}
            {salary && (
              <div className="detail">
                <MdCreditCard className="icon" size={18} />
                <p>{salary}</p>
              </div>
            )}
            <p className="small-text">
              Posted {dayjs(listing.dateCreated).fromNow()}
            </p>
          </Card>
        );
      })}
    </>
  );
}

export default JobCard;
