import React, { useEffect, useState } from "react";
import { MdCheck, MdList, MdPerson, MdVisibility } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import Button from "../../Button";
import Icon from "../../Icon";

const stats = [
  {
    name: "Active Listings",
    icon: FaListUl,
    color: "secondary",
  },
  {
    name: "Applicants",
    icon: MdPerson,
    color: "purple",
  },
  {
    name: "Listing Views",
    icon: MdVisibility,
    color: "yellow",
  },
  {
    name: "Positions Filled",
    icon: MdCheck,
    color: "primary",
  },
];

function Header({ ...props }) {
  const [statValues] = useState([5, 20, 479, 3]);

  useEffect(() => {
    stats.map((stat, i) => (stat.value = statValues[i]));
    // eslint-disable-next-line
  }, [statValues]);
  console.log(stats);
  const renderStats = () => {
    return stats.map((stat, i) => (
      <div className="stat">
        <Icon Icon={stat.icon} color={stat.color} size={50} sizeFactor={0.5} />
        <div>
          <p>{stat.name}</p>
          <h1>{stat.value}</h1>
        </div>
      </div>
    ));
  };

  return (
    <div className="card header" {...props}>
      <div className="left">
        <div>
          <h2>Welcome back,</h2>
          <h1>Jeff</h1>
        </div>
        <div>
          <Button label="Create New Listing" />
        </div>
      </div>
      <div className="right">{renderStats()}</div>
    </div>
  );
}

export default Header;
