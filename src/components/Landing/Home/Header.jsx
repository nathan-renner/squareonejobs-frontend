import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { Button } from "../../common";
import useOnScreen from "./../../../hooks/useOnScreen";

function Header({ setModal }) {
  const [count, setCount] = useState(1);
  const imageBgRef = useRef();
  const isVisible = useOnScreen(imageBgRef);

  useEffect(() => {
    isVisible &&
      setTimeout(() => {
        count === 3 ? setCount(1) : setCount(count + 1);
      }, 3000);
  });

  return (
    <header>
      <div className="image-background" ref={imageBgRef}>
        <img
          data-item={`${count === 1}`}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Home/landing-bg-1.jpg"
          alt="man standing looking off camera with city in background"
        />
        <img
          data-item={`${count === 2}`}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Home/landing-bg-2.jpg"
          alt="man standing looking off camera with city in background"
          loading="lazy"
        />
        <img
          data-item={`${count === 3}`}
          src="https://squareonejobs-landing.s3.us-east-2.amazonaws.com/Home/landing-bg-3.jpg"
          alt="man standing looking off camera with city in background"
          loading="lazy"
        />
        <svg
          className="line-1"
          preserveAspectRatio="none"
          viewBox="0 0 144 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M71 36C71 0 35 0 35 0V72H107C107 72 71 72 71 36Z"
            fill="white"
          />
          <path d="M0 0H36V72H0V0Z" fill="white" />
        </svg>
      </div>
      <div className="container">
        <div className="content">
          <h1 className="title">
            Job search made <span className="text-primary">personal</span>
          </h1>
          <p className="subtitle">
            Find your potential, unlock your purpose - regardless of the
            obstacles you’ve overcome.
          </p>
          <NavLink to="/auth/register">
            <Button
              label="Find jobs for free"
              className="button"
              textStyle={{ fontSize: 20 }}
            />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
