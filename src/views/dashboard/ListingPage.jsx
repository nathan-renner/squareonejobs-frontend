import React from "react";
import Listing from "./Listing";
import { useParams } from "react-router-dom";

function ListingPage(props) {
  const { id } = useParams();
  return (
    <div className="listing-page">
      <Listing id={id} />
    </div>
  );
}

export default ListingPage;
