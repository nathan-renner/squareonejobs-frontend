import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import CountUp from "react-countup";

import Modal from "./Modal";

import Confetti from "../assets/animations/confetti-new.json";
import Button from "./Button";
import NumberFormat from "react-number-format";
import { usePointsModal } from "./../hooks/usePointsModal";

const confettiStyle = {
  position: "absolute",
  top: -50,
  bottom: 0,
  left: 20,
  right: 0,
  zIndex: -1,
};

function PointsModal() {
  const { points, setPoints } = usePointsModal();
  const lottie = useRef(null);

  useEffect(() => {
    if (points) {
      setTimeout(() => {
        lottie.current.play();
      }, 1900);
    }
  }, [points]);

  if (!points) return null;
  else
    return (
      <Modal
        className="points-modal"
        visible={points}
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
              <div className="counter">
                <CountUp
                  start={points.previous}
                  end={points.previous + points.added + points.bonus}
                  className="count-up"
                  separator=","
                  duration={2}
                />
              </div>
              <div className="details">
                <p className="subtitle">
                  +{" "}
                  <NumberFormat
                    fixedDecimalScale={true}
                    thousandSeparator=","
                    value={points.added}
                    displayType={"text"}
                    renderText={(value) => <span>{value}</span>}
                  />{" "}
                  Points
                </p>
                <p className="subtitle blue">
                  +{" "}
                  <NumberFormat
                    fixedDecimalScale={true}
                    thousandSeparator=","
                    value={points.bonus}
                    displayType={"text"}
                    renderText={(value) => <span>{value}</span>}
                  />{" "}
                  Bonus Points
                </p>
                <Button label="YAY" onClick={() => setPoints(false)} />
              </div>
            </div>
          </div>
        )}
      />
    );
}

export default PointsModal;
