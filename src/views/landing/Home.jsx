import React from "react";

import Navbar from "../../components/Landing/Navbar";
import Header from "./../../components/Landing/Home/Header";
import Problem from "./../../components/Landing/Home/Problem";
import Mission from "./../../components/Landing/Home/Mission";
import HowItWorks from "./../../components/Landing/Home/HowItWorks";
import CallToAction from "./../../components/Landing/Home/CallToAction";
import Footer from "../../components/Landing/Footer";
import MobileApp from "./../../components/Landing/Home/MobileApp";
import ContactUs from "./../../components/Landing/Home/ContactUs";

const Home = () => {
  return (
    <div className="landing home">
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
