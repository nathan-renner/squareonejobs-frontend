import React from "react";
import { MdClear } from "react-icons/md";

import OL from "../../../assets/images/outdoor-labor.png";
import WFH from "../../../assets/images/work-from-home.png";

const trends = [
  {
    name: "Work from home",
    source: WFH,
  },
  {
    name: "Outdoor labor",
    source: OL,
  },
  {
    name: "Work from home",
    source: WFH,
  },
  {
    name: "Outdoor labor",
    source: OL,
  },
  {
    name: "Work from home",
    source: WFH,
  },
  {
    name: "Outdoor labor",
    source: OL,
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
