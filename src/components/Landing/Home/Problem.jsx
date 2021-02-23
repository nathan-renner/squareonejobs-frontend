import React from "react";

import Individual from "../../../assets/images/individual.png";
import Business from "../../../assets/images/business.png";
import Nation from "../../../assets/images/nation.png";
import PersonIcon from "../../icons/PersonIcon";
import BuildingIcon from "../../icons/BuildingIcon";
import NationIcon from "../../icons/NationIcon";

const HEIGHT = 40;

function Problem(props) {
  return (
    <section className="section-problem">
      <div className="container problem-container">
        <h2 className="title">Barriers to employment harm</h2>
        <div className="carousel">
          <h2 className="carousel-item item-1" style={{ marginTop: 0 }}>
            individuals.
          </h2>
          <h2 className="carousel-item item-2" style={{ marginTop: HEIGHT }}>
            businesses.
          </h2>
          <h2
            className="carousel-item item-3"
            style={{ marginTop: 2 * HEIGHT }}
          >
            the nation.
          </h2>
          <h2
            className="carousel-item item-4"
            style={{ marginTop: 3 * HEIGHT }}
          >
            everyone.
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="split-cards cards-container">
          <div className="card individual">
            <img src={Individual} alt="Individual" />
            <div className="filter" />
            <div className="content">
              <PersonIcon className="icon" />
              <p className="title">i want this to be short pls</p>
            </div>
          </div>
          <div className="card business">
            <img src={Business} alt="Individual" />
            <div className="filter" />
            <div className="content">
              <BuildingIcon className="icon" />
              <p className="title">i want this to be short pls</p>
            </div>
          </div>
          <div className="card nation">
            <img src={Nation} alt="Individual" />
            <div className="filter" />
            <div className="content">
              <NationIcon className="icon" />
              <p className="title">i want this to be short pls</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Problem;
