import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MdCheck, MdPerson, MdVisibility } from "react-icons/md";
import { FaListUl } from "react-icons/fa";

import { Button, Icon } from "../../common";

const statData = [
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

function Header({ data, ...props }) {
  const history = useHistory();
  const [stats, setStats] = useState(statData);

  useEffect(() => {
    const newStats = [...stats];
    newStats[0].value = data.numOfActiveListings;
    newStats[1].value = data.numOfApplicants;
    newStats[2].value = data.numOfViews;
    newStats[3].value = data.numOfPositionsFilled;
    setStats(newStats);
    // eslint-disable-next-line
  }, []);

  const renderStats = () => {
    return stats.map((stat, i) => (
      <div className="stat" key={i}>
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
          <h1>{data.firstName}</h1>
        </div>
        <div>
          <Button
            label="Create New Listing"
            onClick={() => history.push("/new-listing")}
          />
        </div>
      </div>
      <div className="right">{renderStats()}</div>
    </div>
  );
}

export default Header;
