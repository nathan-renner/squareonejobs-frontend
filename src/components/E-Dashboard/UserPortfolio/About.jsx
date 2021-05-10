import React from "react";
import Card from "./../../Card";

function About({ portfolio, ...otherProps }) {
  return (
    <Card className="about" {...otherProps}>
      <h2>About</h2>
      <p>{portfolio.about}</p>
    </Card>
  );
}

export default About;
