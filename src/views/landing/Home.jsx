import React from "react";

import Navbar from "../../components/Landing/Navbar";
import Header from "./../../components/Landing/Header";
import Problem from "./../../components/Landing/Problem";
import Mission from "./../../components/Landing/Mission";
import HowItWorks from "./../../components/Landing/HowItWorks";
import CallToAction from "./../../components/Landing/CallToAction";
import Footer from "../../components/Landing/Footer";
import MobileApp from "./../../components/Landing/MobileApp";
import ContactUs from "./../../components/Landing/ContactUs";

const Home = () => {
  return (
    <div className="landing">
      <Navbar />
      <Header />
      <Problem />
      <Mission />
      <HowItWorks />
      <MobileApp />
      <CallToAction />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
