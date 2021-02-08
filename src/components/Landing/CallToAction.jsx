import React from "react";
import { NavLink } from "react-router-dom";

function CallToAction(props) {
  return (
    <div className="section-call-to-action">
      <h1 className="title">Ready to get hired?</h1>
      <NavLink to="/auth/register" style={{ textDecoration: "none" }}>
        <div className="cta-button">FIND JOBS!</div>
      </NavLink>
    </div>
  );
}

export default CallToAction;
