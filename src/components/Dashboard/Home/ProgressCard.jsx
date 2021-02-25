import React from "react";
import Card from "./../../Card";
import ProgressBar from "./../../ProgressBar";

function ProgressCard(props) {
  return (
    <Card className="progress-card">
      <h2>Progress</h2>
      <ProgressBar completed={40} />
      <div className="levels">
        <div className="level-container active">1</div>
        <div className="level-container">2</div>
        <div className="level-container">3</div>
        <div className="level-container">4</div>
        <div className="level-container">5</div>
      </div>
    </Card>
  );
}

export default ProgressCard;
