import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import Button from "../../../components/Button";
import useApi from "./../../../hooks/useApi";
import { postListing } from "./../../../api/listings";
import ActivityIndicator from "./../../../components/ActivityIndicator";

function Payment(props) {
  const postListingApi = useApi(postListing);
  const history = useHistory();
  const { state: listing } = useLocation();

  const handleSubmit = async () => {
    console.log(listing);

    const response = await postListingApi.request(listing);
    if (response.ok) {
      history.push("/my-listings");
    } else {
      console.log(response.error);
    }
  };

  return (
    <div className="post-listing">
      <ActivityIndicator visible={postListingApi.loading} />
      <h1>Payment</h1>
      <div style={{ textAlign: "right" }}>
        <Button label="Confirm and Post Job" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Payment;
