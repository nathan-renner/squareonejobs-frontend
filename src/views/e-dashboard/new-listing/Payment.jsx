import React from "react";
import { useLocation } from "react-router-dom";
import Button from "../../../components/Button";

function Payment(props) {
  //const history = useHistory();
  const { state: listing } = useLocation();

  const handleSubmit = () => {
    console.log(listing);
    //history.push("/my-listings")
  };

  return (
    <div className="post-listing">
      <h1>Payment</h1>
      <div style={{ textAlign: "right" }}>
        <Button label="Confirm and Post Job" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Payment;
