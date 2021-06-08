import React from "react";

import { Button } from "../common";

function TempModalContent(props) {
  const openEmail = () => {
    window.open(
      "mailto:hello@squareonejobs.com?subject=Interest in SquareOneJobs&body=Hi, %0d%0a%0d%0aI'm interested in SquareOneJobs and would love to learn more!"
    );
  };
  return (
    <div style={{ textAlign: "center", padding: "2em" }}>
      <h2>Big things are coming!</h2>
      <p>
        We're so glad you're interested in what SquareOneJobs has to offer. Send
        us an email and we'll get in touch with exclusive access and updates to
        the future of our service.
      </p>
      <Button
        label="Contact us!"
        className="btn-lg"
        onClick={() => openEmail()}
        buttonStyle={{ display: "inline-block" }}
      />
    </div>
  );
}

export default TempModalContent;
