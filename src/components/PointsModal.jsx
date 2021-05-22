import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import CountUp from "react-countup";

import Modal from "./Modal";

import Confetti from "../assets/animations/confetti-new.json";
import Button from "./Button";
import NumberFormat from "react-number-format";

const confettiStyle = {
  position: "absolute",
  top: -50,
  bottom: 0,
  left: 20,
  right: 0,
  zIndex: -1,
};

function PointsModal({ setVisible = () => true, points, pointsAdded }) {
  const [initialRun, setInitialRun] = useState(true);
  const lottie = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      lottie.current.play();
      setInitialRun(false);
    }, 900);
  });

  return (
    <Modal
      className="points-modal"
      visible={true}
      Content={() => (
        <div className="points-content">
          <Lottie
            lottieRef={lottie}
            autoplay={false}
            loop={true}
            animationData={Confetti}
            style={confettiStyle}
          />
          <div className="text-container">
            <div className={`counter ${initialRun ? "animation" : null}`}>
              <CountUp
                start={points - pointsAdded}
                end={points}
                className="count-up"
                separator=","
                duration={1}
              />
            </div>
            <div className="details">
              <p className="subtitle">
                +{" "}
                <NumberFormat
                  fixedDecimalScale={true}
                  thousandSeparator=","
                  value={pointsAdded}
                  displayType={"text"}
                  renderText={(value) => <span>{value}</span>}
                />{" "}
                Points
              </p>
              <Button
                //className={!initialRun ? "active" : ""}
                label="YAY"
                onClick={() => {
                  setVisible(false);
                  setInitialRun(true);
                }}
              />
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default PointsModal;
