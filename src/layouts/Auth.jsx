import React from "react";
import Register from "./../views/auth/Register";
import { Redirect, Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./../views/auth/Login";
import Navbar from "./../components/Auth/Navbar";
import Footer from "../components/Auth/Footer";
import Confirmation from "../views/auth/Confirmation";
import PostJob from "./../views/auth/PostJob";
import PostJob2 from "./../views/auth/PostJob2";
import ForgotPassword from "../views/auth/ForgotPassword";
import ResetPassword from "../views/auth/ResetPassword";

function Auth(props) {
  return (
    <div className="auth">
      <Navbar />
      <div className="content-container">
        <Switch>
          <Route
            path="/auth/confirmation/:userId/:code"
            component={Confirmation}
          />
          <Route
            path="/auth/reset-password/:userId/:code"
            component={ResetPassword}
          />
          <Route path="/auth/forgot-password" component={ForgotPassword} />
          <Route path="/auth/postjob-2" component={PostJob2} />
          <Route path="/auth/postjob" component={PostJob} />
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/login" component={Login} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default Auth;
