import React, { useEffect, useState } from "react";
import moment from "moment";
import { MdAccessTime, MdCreditCard, MdLocationOn } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

import MapImg from "../../assets/images/map.png";
import Button from "./../../components/Button";
import NumberFormat from "react-number-format";

import useApi from "./../../hooks/useApi";
import { getListing } from "../../api/listings";

// const listing = {
//   _id: 1,
//   position: "Box Mover",
//   companyName: "Amazon",
//   companyLogo:
//     "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
//   startDateTime: new Date(2020, 11, 1),
//   endDateTime: new Date(2020, 11, 1),
//   location: "1 Castle Point Terrace, Hoboken NJ, 07030",
//   description:
//     "Since opening our virtual doors in 1995, we've been pushing the boundaries of 'possible' further and further. Our entire business works hard to delight our customers - from the second an order is placed online to the seamless coordination of that order behind the scenes, we strive to stay agile, fluid and intentional. That can be described in one of our core Leadership Principles, which is Bias for Action. This means that our teams band together, roll up their sleeves, and aren't content with just standing still. We're aiming to become the most customer-centric company on Earth.Shift Assistants are part of the Last Mile operations in Amazon Logistics and play a crucial role in this rapidly growing team. Shift Assistants are responsible for daily management of department duties including: allocating labor, leading meetings, assigning job duties, providing work direction and communicating with internal and external suppliers.Responsibilities:- Track and report ATS/labor hours...",
//   wage: 80,
//   requirements: "asdfadsf asd f asdfsd f sd fs adf s f asf sda f asfas dfas d",
// };

function Listing({ id, modal = false }) {
  const [listing, setListing] = useState(false);
  const listingApi = useApi(getListing);

  const fetchListing = async () => {
    setListing(false);
    const response = await listingApi.request(id);
    if (response.ok) setListing(response.data);
  };

  useEffect(() => {
    if ((!listing && !listingApi.error) || id !== listing._id) fetchListing();
  }, [id]);

  return (
    <div className={`listing ${modal ? "list-modal" : null}`}>
      <img src={MapImg} alt="Map of Manhattan" className="map" />
      <div className="content">
        <div className="l-header">
          <div className="left">
            {!listing ? (
              <Skeleton circle height={80} width={80} />
            ) : (
              <img
                src={listing.company.logo}
                alt={`${listing.company.name}'s logo`}
                className="logo"
              />
            )}
            <div>
              <p>
                {!listing ? (
                  <Skeleton width={100} />
                ) : (
                  moment(listing.startDateTime).format("MM/DD/YYYY")
                )}
              </p>
              <h2>{!listing ? <Skeleton width={150} /> : listing.position}</h2>
            </div>
          </div>
          <div>
            <Button label="Apply" onClick={() => true} />
          </div>
        </div>
        <div className="l-content">
          {listing.endDateTime && (
            <div className="detail">
              <MdAccessTime className="icon" size={25} />
              <p>
                {!listing ? (
                  <Skeleton width={150} />
                ) : (
                  moment(listing.startDateTime).format("LT") +
                  " - " +
                  moment(listing.endDateTime).format("LT")
                )}
              </p>
            </div>
          )}
          {listing.location && (
            <div className="detail">
              <MdLocationOn className="icon" size={25} />
              <p>{!listing ? <Skeleton width={200} /> : listing.location}</p>
            </div>
          )}
          {listing.wage && (
            <div className="detail">
              <MdCreditCard className="icon" size={25} />
              <NumberFormat
                decimalScale={2}
                fixedDecimalScale={true}
                value={listing.wage}
                displayType={"text"}
                prefix={"$"}
                allowNegative={false}
                renderText={(value) => (
                  <p>{!listing ? <Skeleton width={150} /> : value}</p>
                )}
              />
            </div>
          )}
          {!listing ? (
            <Skeleton count={10} />
          ) : (
            <>
              {listing.requirements && (
                <>
                  <h3>Requirements</h3>
                  <p>{listing.requirements}</p>
                </>
              )}
              {listing.description && (
                <>
                  <h3>Description</h3>
                  <p>{listing.description}</p>
                </>
              )}
              {listing.benefits && (
                <>
                  <h3>Benefits</h3>
                  <p>{listing.benefits}</p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Listing;
