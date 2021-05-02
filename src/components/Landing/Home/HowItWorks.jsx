import React, { useRef } from "react";
import Lottie from "lottie-react";

import CompleteDayJobs from "../../../assets/animations/completeDayJobs.json";
import EarnReferences from "../../../assets/animations/earnReferences.json";
import GetHired from "../../../assets/animations/getHired.json";

const dayjobsInteractivity = {
  mode: "scroll",
  actions: [
    {
      visibility: [0, 0.3],
      type: "stop",
      frames: [1],
    },
    {
      visibility: [0.3, 0.7],
      type: "loop",
      frames: [1, 172],
    },
    {
      visibility: [0.7, 1],
      type: "stop",
      frames: [1],
    },
  ],
};
const referencesInteractivity = {
  mode: "scroll",
  actions: [
    {
      visibility: [0, 0.3],
      type: "stop",
      frames: [1],
    },
    {
      visibility: [0.3, 0.7],
      type: "loop",
      frames: [1, 180],
    },
    {
      visibility: [0.7, 1],
      type: "stop",
      frames: [1],
    },
  ],
};
const fulltimeInteractivity = {
  mode: "scroll",
  actions: [
    {
      visibility: [0, 0.3],
      type: "stop",
      frames: [1],
    },
    {
      visibility: [0.3, 0.7],
      type: "loop",
      frames: [1, 91],
    },
    {
      visibility: [0.7, 1],
      type: "stop",
      frames: [1],
    },
  ],
};

function HowItWorks(props) {
  const dayjobs = useRef();
  const references = useRef();
  const fulltime = useRef();
  return (
    <section className="section-how-it-works">
      <div className="container split split-right feature-container">
        <div className="lottie-container">
          <svg
            className="blob-1"
            viewBox="0 0 472 528"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M257.025 4.00136C159.414 -15.2008 107.026 37.2897 39.5001 108C-28.0253 178.71 2.05075 375.003 60.0254 414.001C118 453 328.313 594.185 433.525 489.001C520.014 402.536 428.526 302.501 443.525 176.001C458.525 49.5012 354.24 23.1255 257.025 4.00136Z"
              fill="#EFFAF5"
            />
          </svg>
          <Lottie
            animationData={CompleteDayJobs}
            lottieRef={dayjobs}
            interactivity={dayjobsInteractivity}
            className="feature-lottie"
          />
        </div>
        <div className="feature-content right">
          <h2 className="title">Complete Day Jobs</h2>
          <p className="subtitle">
            Complete day jobs to build up your portfolio and earn points
          </p>
        </div>
      </div>
      <div className="container split feature-container">
        <div className="lottie-container">
          <svg
            className="blob-2"
            viewBox="0 0 484 571"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M304.919 9.23065C196.921 -17.1478 98.1675 12.4515 36.919 105.231C-2.09074 164.323 3.00565 212.426 2.41902 283.231C1.49595 394.644 -19.5784 511.275 81.919 557.231C177.024 600.292 317.476 530.966 396.919 463.231C501.107 374.396 488.919 215.731 472.419 140.231C455.919 64.7307 385.59 28.9346 304.919 9.23065Z"
              fill="#EBF5FE"
            />
          </svg>
          <Lottie
            animationData={EarnReferences}
            lottieRef={references}
            interactivity={referencesInteractivity}
            className="feature-lottie"
          />
        </div>
        <div className="feature-content left">
          <h2 className="title">Earn References</h2>
          <p className="subtitle">
            Stand out to potential employers with previous employer references
          </p>
        </div>
      </div>
      <div className="container split split-right feature-container">
        <div className="lottie-container">
          <svg
            className="blob-3"
            viewBox="0 0 563 629"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M321.285 0.0555742C215.848 -1.98323 151.617 52.2335 88.2852 136.556C5.53577 246.73 -40.4345 381.21 47.7852 487.056C132.984 589.277 356.285 727.556 386.785 521.556C417.285 315.556 623.341 278.468 544.285 136.556C494.594 47.3561 423.373 2.0296 321.285 0.0555742Z"
              fill="#EFFAF5"
            />
          </svg>
          <Lottie
            animationData={GetHired}
            lottieRef={fulltime}
            interactivity={fulltimeInteractivity}
            className="feature-lottie"
          />
        </div>
        <div className="feature-content">
          <h2 className="title">Find Full-Time Employment</h2>
          <p className="subtitle">
            Access a vast network of potential employers
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
