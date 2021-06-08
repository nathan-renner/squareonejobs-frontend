import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import { postListing } from "./../../../api/listings";
import { useResponseModal } from "./../../../hooks/useResponseModal";
import useApi from "./../../../hooks/useApi";

import { ActivityIndicator, Button } from "../../../components/common";

function Payment(props) {
  const postListingApi = useApi(postListing);
  const { setModal } = useResponseModal();
  const history = useHistory();
  const { state: listing } = useLocation();

  const handleSubmit = async () => {
    const response = await postListingApi.request(listing);
    if (response.ok) {
      history.push("/my-listings");
    } else
      setModal({
        type: "error",
        header: "Something went wrong",
        body: response.data,
        buttonText: "retry",
        onClick: handleSubmit,
        onCancel: () => setModal(false),
      });
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
