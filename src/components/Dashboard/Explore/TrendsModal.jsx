import React from "react";
import { MdClear } from "react-icons/md";

const trends = [
  {
    name: "Work from home",
    source:
      "https://squareonejobs.s3.us-east-2.amazonaws.com/dashboard/work-from-home.png",
  },
  {
    name: "Outdoor labor",
    source:
      "https://squareonejobs.s3.us-east-2.amazonaws.com/dashboard/outdoor-labor.png",
  },
  {
    name: "Work from home",
    source:
      "https://squareonejobs.s3.us-east-2.amazonaws.com/dashboard/work-from-home.png",
  },
  {
    name: "Outdoor labor",
    source:
      "https://squareonejobs.s3.us-east-2.amazonaws.com/dashboard/outdoor-labor.png",
  },
  {
    name: "Work from home",
    source:
      "https://squareonejobs.s3.us-east-2.amazonaws.com/dashboard/work-from-home.png",
  },
  {
    name: "Outdoor labor",
    source:
      "https://squareonejobs.s3.us-east-2.amazonaws.com/dashboard/outdoor-labor.png",
  },
];

function TrendsModal({ onExit }) {
  return (
    <div className="trends trends-modal">
      <MdClear size={25} className="exit" onClick={onExit} />
      {trends.map((trend, index) => (
        <div key={index} className="trend">
          <img src={trend.source} alt="trend" />
          <p>{trend.name}</p>
        </div>
      ))}
    </div>
  );
}

export default TrendsModal;
