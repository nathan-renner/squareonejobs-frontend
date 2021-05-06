import React from "react";
import { useHistory } from "react-router-dom";
import { MdCheck, MdPerson, MdVisibility } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import Button from "../../Button";
import Icon from "../../Icon";

const stats = [
  {
    name: "Active Listings",
    icon: FaListUl,
    color: "secondary",
    value: 5,
  },
  {
    name: "Applicants",
    icon: MdPerson,
    color: "purple",
    value: 20,
  },
  {
    name: "Listing Views",
    icon: MdVisibility,
    color: "yellow",
    value: 479,
  },
  {
    name: "Positions Filled",
    icon: MdCheck,
    color: "primary",
    value: 3,
  },
];

function Header({ ...props }) {
  const history = useHistory();

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
          <h1>Jeff</h1>
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
