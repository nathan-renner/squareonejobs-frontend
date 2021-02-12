import React from "react";
import { NavLink } from "react-router-dom";

function CallToAction(props) {
  return (
    <section className="section-call-to-action bg-primary">
      <div className="container content">
        <h2 className="title">Ready to get hired?</h2>
        <NavLink to="/auth/register" style={{ textDecoration: "none" }}>
          <div className="cta-button">FIND JOBS!</div>
        </NavLink>
      </div>
    </section>
  );
}

export default CallToAction;
