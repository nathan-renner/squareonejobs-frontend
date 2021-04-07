import React from "react";
import Lottie from "lottie-react";

import ProgressBar from "./ProgressBar";

import Done from "../assets/animations/done.json";

function UploadScreen({ onDone, progress = 0, visible = false }) {
  const styles = {
    animation: {
      width: 200,
    },
  };

  if (!visible) return null;
  if (visible)
    return (
      <div className="overlay">
        {progress < 1 ? (
          <ProgressBar completed={progress} width={200} />
        ) : (
          <Lottie
            autoPlay
            onLoopComplete={onDone}
            animationData={Done}
            style={styles.animation}
          />
        )}
      </div>
    );
}

export default UploadScreen;
