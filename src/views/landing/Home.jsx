import React, { useState } from "react";

import Navbar from "../../components/Landing/Navbar";
import Header from "./../../components/Landing/Home/Header";
import Problem from "./../../components/Landing/Home/Problem";
import Mission from "./../../components/Landing/Home/Mission";
import HowItWorks from "./../../components/Landing/Home/HowItWorks";
import CallToAction from "./../../components/Landing/Home/CallToAction";
import Footer from "../../components/Landing/Footer";
import MobileApp from "./../../components/Landing/Home/MobileApp";
import ContactUs from "./../../components/Landing/Home/ContactUs";
import TempModalContent from "./../../components/Landing/TempModalContent";

import { Modal } from "../../components/common";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div className="landing home">
      <Modal
        clasName="modal-sm"
        visible={modalVisible}
        Content={TempModalContent}
        onCancel={() => setModalVisible(false)}
      />
      <Navbar setModal={setModalVisible} />
      <Header setModal={setModalVisible} />
      <Problem />
      <Mission />
      <HowItWorks />
      <MobileApp />
      <CallToAction setModal={setModalVisible} />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
