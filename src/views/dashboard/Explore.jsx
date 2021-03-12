import React, { useState } from "react";
import Card from "./../../components/Card";
import { useHistory } from "react-router-dom";
import { MdComputer } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaAppleAlt, FaBullhorn } from "react-icons/fa";
import { RiShoppingBag2Fill } from "react-icons/ri";

import OL from "../../assets/images/outdoor-labor.png";
import WFH from "../../assets/images/work-from-home.png";
import Modal from "./../../components/Modal";
import CategoriesModal from "./../../components/Dashboard/Explore/CategoriesModal";
import TrendsModal from "./../../components/Dashboard/Explore/TrendsModal";

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

function Explore(props) {
  const [catModal, setCatModal] = useState(false);
  const [trendsModal, setTrendsModal] = useState(false);
  const history = useHistory();

  const searchCat = (name) => {
    history.push("/search", {
      search: name,
    });
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
