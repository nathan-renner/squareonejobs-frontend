import React from "react";
import Lottie from "lottie-react";

import Loader from "../assets/animations/loader.js";

const ActivityIndicator = ({ visible }) => {
  if (!visible) return null;
  if (visible) {
    return (
      <div className="overlay">
        <Lottie
          animationData={Loader}
          loop={true}
          autoplay={true}
          className="loader"
        />
      </div>
    );
  }
};

export default ActivityIndicator;
