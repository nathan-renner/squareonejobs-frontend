import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Listing from "./Listing";
import moment from "moment";
import Card from "./../../components/Card";
import { MdAccessTime } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { MdCreditCard } from "react-icons/md";
import NumberFormat from "react-number-format";
import Filters from "./../../components/Dashboard/Search/Filters";

const listings = new Array(15).fill({
  _id: 1,
  position: "Box Mover",
  companyName: "Amazon",
  companyLogo:
    "https://squareonejobs-images.s3.us-east-2.amazonaws.com/dummy-data/amazon.png",
  startDateTime: new Date(2020, 11, 1),
  endDateTime: new Date(2020, 11, 1),
  location: "1 Castle Point Terrace, Hoboken NJ, 07030",
  wage: 80,
});

function Search(props) {
  const history = useHistory();
  const { search, category } = history.location.state;
  const [selected, setSelected] = useState();
  const [filter, setFilter] = useState({
    category: category ? category : "",
    jobType: "",
    radius: "",
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
        className={`${index === selected ? "active" : null}`}
        onClick={() => setSelected(index)}
      >
        <div className="card-header">
          <img src={listing.companyLogo} className="logo" />
          <div>
            <p>Posted 21 days ago</p>
            <h2>{listing.position}</h2>
            <p></p>
          </div>
        </div>
        {listing.endDateTime && (
          <div className="detail">
            <MdAccessTime className="icon" size={20} />
            <p>
              {moment(listing.startDateTime).format("LT") +
                " - " +
                moment(listing.endDateTime).format("LT")}
            </p>
          </div>
        )}
        {listing.location && (
          <div className="detail">
            <MdLocationOn className="icon" size={20} />
            <p>{listing.location}</p>
          </div>
        )}
        {listing.wage && (
          <div className="detail">
            <MdCreditCard className="icon" size={20} />
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
      </Card>
    ));
  };

  return (
    <div className="search">
      <Filters filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Search results for: "{search && search}"</h3>
      <div className="results-container">
        <div className="results">{renderListings()}</div>
        <div className="selected">
          <Listing />
        </div>
      </div>
    </div>
  );
}

export default Search;
