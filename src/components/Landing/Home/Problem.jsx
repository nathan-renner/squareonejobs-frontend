import React, { useEffect, useRef, useState } from "react";

import PersonIcon from "../../icons/PersonIcon";
import BuildingIcon from "../../icons/BuildingIcon";
import NationIcon from "../../icons/NationIcon";
import useOnScreen from "./../../../hooks/useOnScreen";

function Problem(props) {
  const [count, setCount] = useState(1);
  const ref = useRef();
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    let timeout;
    if (isVisible) {
      timeout = setTimeout(() => {
        if (count === 4.5) setCount(1);
        else setCount(count + 0.5);
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  const getPos = (num) => {
    return ((count + num) % 4) + 1 === 4.5
      ? "4.5"
      : `${Math.floor(((count + num) % 4) + 1)}`;
  };

  return (
    <section className="section-problem" ref={ref}>
      <div className="container problem-container">
        <h2 className="title">Breaking employment barriers helps</h2>
        <div className="carousel">
          <h2 className="carousel-item" data-item={getPos(1)}>
            individuals.
          </h2>
          <h2 className="carousel-item" data-item={getPos(0)}>
            businesses.
          </h2>
          <h2 className="carousel-item" data-item={getPos(3)}>
            the nation.
          </h2>
          <h2 className="carousel-item" data-item={getPos(2)}>
            everyone.
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="split-cards cards-container">
          <div
            className="card individual"
            data-item={Math.floor(count) === 1}
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
            data-item={Math.floor(count) === 2}
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
            data-item={Math.floor(count) === 3}
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
