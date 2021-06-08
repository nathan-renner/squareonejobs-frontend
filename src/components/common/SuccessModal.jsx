import React from "react";
import Lottie from "lottie-react";

import Done from "../../assets/animations/done.json";
import { useSuccessScreen } from "../../hooks/useSuccessScreen";

function SuccessModal() {
  const { visible, onDone, text } = useSuccessScreen();

  if (!visible) return null;
  return (
    <div className="success-modal">
      <div className="sm-container">
        <Lottie
          autoPlay
          onLoopComplete={onDone}
          animationData={Done}
          className="animation"
        />
        <h1>{text}</h1>
      </div>
    </div>
  );
}

export default SuccessModal;
