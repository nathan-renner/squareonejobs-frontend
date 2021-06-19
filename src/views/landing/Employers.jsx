import React from "react";
import Header from "../../components/Landing/Employers/Header";
import Navbar from "./../../components/Landing/Navbar";
import LogoCarousel from "../../components/Landing/Employers/LogoCarousel";
import EmployerWhy from "../../components/Landing/Employers/EmployerWhy";
import EmployerReasons from "../../components/Landing/Employers/EmployerReasons";
import EmployerHowItWorks from "../../components/Landing/Employers/EmployerHowItWorks";
import EmployerPricing from "../../components/Landing/Employers/EmployerPricing";
import ContactUs from "./../../components/Landing/Home/ContactUs";
import Footer from "./../../components/Landing/Footer";

const Employers = () => {
  return (
    <div className="landing employers">
      <Navbar dark />
      <Header />
      <LogoCarousel />
      <EmployerWhy />
      <EmployerReasons />
      <EmployerHowItWorks />
      <EmployerPricing />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Employers;
