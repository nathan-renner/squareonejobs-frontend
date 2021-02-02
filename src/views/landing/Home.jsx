import React, { useEffect } from "react";
import Card from "./../../components/Card";
import ThemeSwitch from "./../../components/ThemeSwitch";
import lottie from "lottie-web";
import dude from "../../assets/animations/dude.json";

const Home = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("loader"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: dude,
    });
  });

  return (
    <>
      <div className="section">
        <ThemeSwitch />
        <Card>
          <h1>Home Page</h1>
          <div id="loader" />
        </Card>
      </div>
    </>
  );
};

export default Home;
