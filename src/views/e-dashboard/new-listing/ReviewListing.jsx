import React from "react";
import Listing from "./Listing";
import { useLocation, useHistory } from "react-router-dom";
import Button from "../../../components/Button";

function ReviewListing(props) {
  const history = useHistory();
  const { state: listing } = useLocation();

  return (
    <div className="post-listing">
      <h1>Review Listing</h1>
      <Listing listing={listing} map={false} />
      <div style={{ textAlign: "right" }}>
        <Button
          label="Proceed to Payment"
          onClick={() => history.push("/new-listing/payment", listing)}
        />
      </div>
    </div>
  );
}

export default ReviewListing;
