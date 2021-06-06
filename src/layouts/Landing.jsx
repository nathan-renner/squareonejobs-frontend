import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./../views/landing/Home";
import Employers from "./../views/landing/Employers";
import ResponseModal from "./../components/ResponseModal";
import Resources from "./../views/landing/Resources";

const Landing = () => {
  return (
    <>
      <Switch>
        <Route path="/resources" component={Resources} />
        <Route path="/employers" component={Employers} />
        <Route exact path="/" component={Home} />
        <Redirect to="/not-found" />
      </Switch>
      <ResponseModal />
    </>
  );
};

export default Landing;
