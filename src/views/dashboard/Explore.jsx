import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaAppleAlt, FaBullhorn } from "react-icons/fa";
import { RiShoppingBag2Fill } from "react-icons/ri";

import { Card, Modal } from "../../components/common";

import CategoriesModal from "./../../components/Dashboard/Explore/CategoriesModal";
import TrendsModal from "./../../components/Dashboard/Explore/TrendsModal";

const categories = [
  {
    name: "Restaurant Services",
    Icon: IoFastFoodSharp,
    color: "#fa8181",
  },
  {
    name: "Sales",
    Icon: FaAppleAlt,
    color: "#ffe188",
  },
  {
    name: "Construction",
    Icon: RiShoppingBag2Fill,
    color: "#80d6ab",
  },
  {
    name: "Warehouse",
    Icon: FaBullhorn,
    color: "#918cc7",
  },
  {
    name: "Labor",
    Icon: FaBullhorn,
    color: "#918cc7",
  },
];

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

function Explore(props) {
  const [catModal, setCatModal] = useState(false);
  const [trendsModal, setTrendsModal] = useState(false);
  const history = useHistory();

  const searchCat = (name) => {
    history.push(`/search/?c=${name}`);
  };

  const renderCategories = () => {
    return categories.map(({ name, Icon, color }, index) => (
      <div className="category" key={index} onClick={() => searchCat(name)}>
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
      <Modal
        visible={catModal}
        title="Select a Category"
        Content={CategoriesModal}
        componentProps={{
          onExit: () => setCatModal(false),
          onSelect: searchCat,
        }}
      />
      <Modal
        visible={trendsModal}
        title="Trends"
        Content={TrendsModal}
        componentProps={{ onExit: () => setTrendsModal(false) }}
      />
      <Card simple data-aos="fade-up">
        <div className="header-container">
          <h2>Categories</h2>
          <p onClick={() => setCatModal(true)}>See more</p>
        </div>
        <div className="categories">{renderCategories()}</div>
      </Card>
      <Card simple data-aos="fade-up" data-aos-delay="100">
        <div className="header-container">
          <h2>Job Trends</h2>
          <p onClick={() => setTrendsModal(true)}>See more</p>
        </div>
        <div className="trends">{renderTrends()}</div>
      </Card>
    </div>
  );
}

export default Explore;
