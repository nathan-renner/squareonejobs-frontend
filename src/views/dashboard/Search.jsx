import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { MdAccessTime, MdLocationOn, MdCreditCard } from "react-icons/md";

import Card from "./../../components/Card";
import Listing from "./Listing";
import Filters from "./../../components/Dashboard/Search/Filters";

import { getActiveDay } from "./../../api/listings";
import useApi from "../../hooks/useApi";
import ActivityIndicator from "./../../components/ActivityIndicator";
import Button from "./../../components/Button";

// const listings = new Array(15).fill({
//   _id: 1,
//   position: "Box Mover",
//   companyName: "Amazon",
//   companyLogo:
//     "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
//   startDateTime: new Date(2020, 11, 1),
//   endDateTime: new Date(2020, 11, 1),
//   location: "1 Castle Point Terrace, Hoboken NJ, 07030",
//   wage: 80,
// });

function Search(props) {
  const history = useHistory();
  const { search, category } = history.location.state;
  const [selected, setSelected] = useState(false);
  const [filter, setFilter] = useState({
    category: category ? category : "",
    jobType: "",
    radius: "",
  });
  const [listings, setListings] = useState(false);
  const listingsApi = useApi(getActiveDay);

  const fetchListings = async () => {
    const response = await listingsApi.request();
    if (response.ok) setListings(response.data);
  };

  useEffect(() => {
    if (!listings && !listingsApi.error) fetchListings();
  });

  const handleFilterChange = (e, type) => {
    const newFilter = { ...filter };
    newFilter[type] = e.target.value;
    setFilter(newFilter);
  };

  const renderListings = () => {
    return listings.map((listing, index) => (
      <Card
        key={index}
        className={`${listing._id === selected ? "active" : null}`}
        onClick={() => setSelected(listing._id)}
      >
        <div className="card-header">
          <img src={listing.company.logo} className="logo" />
          <div>
            <h2>{listing.position}</h2>
            <p className="small-text">{listing.company.name}</p>
            <p></p>
          </div>
        </div>
        {listing.endDateTime && (
          <div className="detail">
            <MdAccessTime className="icon" size={18} />
            <p>
              {moment(listing.startDateTime).format("LT") +
                " - " +
                moment(listing.endDateTime).format("LT")}
            </p>
          </div>
        )}
        {listing.location && (
          <div className="detail">
            <MdLocationOn className="icon" size={18} />
            <p>{listing.location}</p>
          </div>
        )}
        {listing.wage && (
          <div className="detail">
            <MdCreditCard className="icon" size={18} />
            <NumberFormat
              decimalScale={2}
              fixedDecimalScale={true}
              value={listing.wage}
              displayType={"text"}
              prefix={"$"}
              allowNegative={false}
              renderText={(value) => <p>{value}</p>}
            />
          </div>
        )}
        <p className="small-text">
          Posted {moment(listing.dateCreated).fromNow()}
        </p>
      </Card>
    ));
  };

  return (
    <div className="search">
      <Filters filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Search results for: "{search && search}"</h3>
      <ActivityIndicator visible={listingsApi.loading} />
      {listings && (
        <div className="results-container">
          <div className="results">{renderListings()}</div>
          <div className="selected">
            {selected ? <Listing id={selected} /> : <div>No listing</div>}
          </div>
        </div>
      )}
      {listingsApi.error && (
        <div className="error-container">
          <div>
            <h3>Error loading portfolio</h3>
            <Button label="retry" onClick={() => fetchListings()} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
