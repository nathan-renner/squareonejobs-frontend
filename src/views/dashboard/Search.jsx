import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Listing from "./Listing";
import Card from "./../../components/Card";

const listings = new Array(15).fill(0);

// const listing = {
//   _id: 1,
//   type: "day",
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
// };

function Search(props) {
  const history = useHistory();
  const { search } = history.location.state;
  const [selected, setSelected] = useState();

  const renderListings = () => {
    return listings.map((list, index) => (
      <Card
        key={index}
        className={`${index === selected ? "active" : null}`}
        onClick={() => setSelected(index)}
      >
        <h2>{index}</h2>
      </Card>
    ));
  };

  return (
    <div className="search">
      <div className="filters">Filters</div>
      <h1>Search results for: "{search && search}"</h1>
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
