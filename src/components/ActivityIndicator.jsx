import React, { useEffect } from "react";
import lottie from "lottie-web";

import Loader from "../assets/animations/loader.js";

const ActivityIndicator = ({ visible }) => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("loader"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: Loader,
    });
  });

  if (!visible) return null;
  if (visible) {
    return (
      <div className="overlay">
        <div id="loader" className="loader" />
      </div>
    );
  }
};

export default ActivityIndicator;
