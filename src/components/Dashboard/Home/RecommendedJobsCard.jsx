import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "../../Card";
import MultiButton from "./../../MultiButton";

const buttons = ["Day Jobs", "Full Time", "Part Time"];

function RecommendedJobsCard(props) {
  const [activeButton, setActiveButton] = useState(0);

  return (
    <Card className="recommended-jobs-card">
      <div className="header">
        <h2>Jobs for you</h2>
        <NavLink to="/">See more</NavLink>
      </div>
      <div className="selectors">
        <MultiButton
          className="filter"
          buttons={buttons}
          active={activeButton}
          onClick={setActiveButton}
        />
      </div>
    </Card>
  );
}

export default RecommendedJobsCard;
