import React from "react";
import Card from "./../../Card";
import ProgressBar from "./../../ProgressBar";

function ProgressCard({ level = 1, points = 0, ...props }) {
  const levels = [1, 100000, 500000, 1000000, 3000000];

  const renderLevels = () => {
    return levels.map((l, index) => (
      <div
        className={`level-container ${index + 1 <= level ? "active" : null}`}
        key={index}
      >
        {index + 1}
      </div>
    ));
  };

  return (
    <Card className="progress-card" {...props}>
      <h2>Progress</h2>
      <ProgressBar completed={(points / levels[level]) * 100} />
      <p>{levels[level] - points} until next level</p>
      <div className="levels">{renderLevels()}</div>
    </Card>
  );
}

export default ProgressCard;
