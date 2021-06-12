import React from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { FaAppleAlt } from "react-icons/fa";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { FaBullhorn } from "react-icons/fa";

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
  {
    name: "Driving",
    Icon: FaBullhorn,
    color: "#918cc7",
  },
  {
    name: "E-Commerce",
    Icon: FaBullhorn,
    color: "#918cc7",
  },
  {
    name: "Technology Support",
    Icon: FaBullhorn,
    color: "#918cc7",
  },
];

function CategoriesModal({ onExit, onSelect }) {
  return (
    <div className="categories cat-modal">
      <MdClear size={25} className="exit" onClick={onExit} />
      {categories.map(({ name, Icon, color }, index) => (
        <div className="category" key={index} onClick={() => onSelect(name)}>
          <div className="cat-icon" style={{ backgroundColor: color }}>
            <Icon size={30} color="white" />
          </div>
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoriesModal;
