import React from "react";
import Header from "../../components/Landing/Employers/Header";
import Navbar from "./../../components/Landing/Navbar";
import EmployerWhy from "../../components/Landing/Employers/EmployerWhy";
import Footer from "./../../components/Landing/Footer";
import ContactUs from "./../../components/Landing/Home/ContactUs";
import EmployerHow from "../../components/Landing/Employers/EmployerHow";

const Employers = () => {
  return (
    <div className="landing employers">
      <Navbar />
      <Header />
      <EmployerWhy />
      <EmployerHow />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Employers;
