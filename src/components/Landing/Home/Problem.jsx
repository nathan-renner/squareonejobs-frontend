import React from "react";

import PersonIcon from "../../icons/PersonIcon";
import BuildingIcon from "../../icons/BuildingIcon";
import NationIcon from "../../icons/NationIcon";

const HEIGHT = 40;

function Problem(props) {
  return (
    <section className="section-problem">
      <div className="container problem-container">
        <h2 className="title">Breaking employment barriers helps</h2>
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
          <div
            className="card individual"
            onClick={() =>
              window.open(
                "https://wol.iza.org/uploads/articles/399/pdfs/do-post-prison-job-opportunities-reduce-recidivism.pdf"
              )
            }
          >
            <img
              src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Home/individual.jpg"
              alt="Individual"
              loading="lazy"
            />
            <div className="filter" />
            <div className="content">
              <PersonIcon className="icon" />
              <p className="title">
                Individuals can access their full potential
              </p>
            </div>
          </div>
          <div
            className="card business"
            onClick={() =>
              window.open(
                "https://www.goodhire.com/blog/7-reasons-to-hire-people-with-criminal-records/"
              )
            }
          >
            <img
              src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Home/business.jpg"
              alt="Business"
              loading="lazy"
            />
            <div className="filter" />
            <div className="content">
              <BuildingIcon className="icon" />
              <p className="title">
                Businesses boost growth with motivated workers
              </p>
            </div>
          </div>
          <div
            className="card nation"
            onClick={() =>
              window.open(
                "https://s27147.pcdn.co/wp-content/uploads/Business-Case-Fair-Chance-Employment.pdf"
              )
            }
          >
            <img
              src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Home/nation.jpg"
              alt="GDP"
              loading="lazy"
            />
            <div className="filter" />
            <div className="content">
              <NationIcon className="icon" />
              <p className="title">GDP can gain tens of billions each year</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Problem;
