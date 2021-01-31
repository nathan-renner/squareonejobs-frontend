import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import Navbar from "./../../components/Dashboard/Navbar";
import Card from "./../../components/Card";

const Home = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-container">
        <Navbar />
        <div className="content-container">
          <Card>
            <h2>Card</h2>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
