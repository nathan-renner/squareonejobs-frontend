import React from "react";

import Navbar from "../../components/Landing/Navbar";
import Header from "./../../components/Landing/Header";
import Problem from "./../../components/Landing/Problem";

const Home = () => {
  return (
    <div className="landing">
      <Navbar />
      <Header />
      <Problem />
    </div>
  );
};

export default Home;
