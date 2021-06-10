import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import Listing from "./Listing";

import { Button } from "../../../components/common";

function ReviewListing(props) {
  const history = useHistory();
  const { state: listing } = useLocation();

  return (
    <div className="post-listing">
      <h1>Review Listing</h1>
      <Listing listing={listing} map={false} />
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
  );
}

export default ReviewListing;
