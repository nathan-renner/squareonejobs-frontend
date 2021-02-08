import React from "react";

import Navbar from "../../components/Landing/Navbar";
import Header from "./../../components/Landing/Header";
import Problem from "./../../components/Landing/Problem";
import Footer from "../../components/Landing/Footer";
import CallToAction from "./../../components/Landing/CallToAction";
import HowItWorks from "./../../components/Landing/HowItWorks";

const Home = () => {
  return (
    <div className="landing">
      <Navbar />
      <Header />
      <Problem />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
