import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./../components/Landing/Navbar";
import Button from "./../components/Button";

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="landing not-found">
      <Navbar className="navbar-light" />
      <div className="content">
        <h1>404</h1>
        <h2>This page doesn't seem to exist.</h2>
        <Button
          onClick={() => history.push("/")}
          label="Home"
          textStyle={{ fontSize: 20 }}
        />
      </div>
    </div>
  );
};

export default NotFound;
