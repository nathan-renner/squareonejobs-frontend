import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Listing from "./Listing";
import Card from "./../../components/Card";

const listings = new Array(15).fill(0);

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
      <h1>Search results for: "{search}"</h1>
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
