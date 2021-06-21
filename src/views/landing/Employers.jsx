import React from "react";
import Header from "../../components/Landing/Employers/Header";
import Navbar from "./../../components/Landing/Navbar";
import KnowWhoYoureHiring from "../../components/Landing/Employers/KnowWhoYoureHiring";
import HowItWorks from "../../components/Landing/Employers/HowItWorks";
import Pricing from "../../components/Landing/Employers/Pricing";
import ContactUs from "./../../components/Landing/Home/ContactUs";
import Footer from "./../../components/Landing/Footer";
import CompanyLogos from "./../../components/Landing/Employers/CompanyLogos";
import OvercomeObstacles from "./../../components/Landing/Employers/OvercomeObstacles";

const Employers = () => {
  return (
    <div className="landing employers">
      <Navbar dark />
      <Header />
      <CompanyLogos />
      <OvercomeObstacles />
      <KnowWhoYoureHiring />
      <HowItWorks />
      <Pricing />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Employers;
