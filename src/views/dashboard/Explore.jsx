import React, { useState } from "react";
import Card from "./../../components/Card";
import { MdComputer } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaAppleAlt, FaBullhorn } from "react-icons/fa";
import { RiShoppingBag2Fill } from "react-icons/ri";

import OL from "../../assets/images/outdoor-labor.png";
import WFH from "../../assets/images/work-from-home.png";
import Modal from "./../../components/Modal";
import CategoriesModal from "./../../components/Dashboard/Explore/CategoriesModal";

const categories = [
  {
    name: "Restaurant Services",
    Icon: IoFastFoodSharp,
    color: "#fa8181",
  },
  {
    name: "Computer Science",
    Icon: MdComputer,
    color: "#5ca9f5",
  },
  {
    name: "Education",
    Icon: FaAppleAlt,
    color: "#ffe188",
  },
  {
    name: "Retail",
    Icon: RiShoppingBag2Fill,
    color: "#80d6ab",
  },
  {
    name: "Marketing",
    Icon: FaBullhorn,
    color: "#918cc7",
  },
];

const trends = [
  {
    name: "Work from home",
    source: WFH,
  },
  {
    name: "Outdoor labor",
    source: OL,
  },
];

function Explore(props) {
  const [seeMore, setSeeMore] = useState(false);
  const renderCategories = () => {
    return categories.map(({ name, Icon, color }, index) => (
      <div className="category" key={index}>
        <div className="cat-icon" style={{ backgroundColor: color }}>
          <Icon size={30} color="white" />
        </div>
        <p>{name}</p>
      </div>
    ));
  };
  const renderTrends = () => {
    return trends.map((trend, index) => (
      <div key={index} className="trend">
        <img src={trend.source} alt="trend" />
        <p>{trend.name}</p>
      </div>
    ));
  };

  return (
    <div className="explore">
      {seeMore && (
        <Modal
          title="Select a Category"
          Content={CategoriesModal}
          componentProps={{ onExit: () => setSeeMore(false) }}
        />
      )}
      <Card simple>
        <div className="header-container">
          <h2>Categories</h2>
          <p onClick={() => setSeeMore(true)}>See more</p>
        </div>
        <div className="categories">{renderCategories()}</div>
      </Card>
      <Card simple>
        <h2>Job Trends</h2>
        <div className="trends">{renderTrends()}</div>
      </Card>
    </div>
  );
}

export default Explore;
