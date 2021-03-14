import React from "react";
import Header from "../../components/Landing/Employers/Header";
import Navbar from "./../../components/Landing/Navbar";
import Footer from "./../../components/Landing/Footer";
import ContactUs from "./../../components/Landing/Home/ContactUs";

const Employers = () => {
  return (
    <div className="landing">
      <Navbar />
      <Header />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Employers;
