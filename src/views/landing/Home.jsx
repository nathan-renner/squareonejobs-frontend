import React from "react";
import Card from "./../../components/Card";
import ThemeSwitch from "./../../components/ThemeSwitch";

const Home = () => {
  return (
    <>
      <div className="section">
        <ThemeSwitch />
        <Card>
          <h1>Home Page</h1>
        </Card>
      </div>
    </>
  );
};

export default Home;
