import React from "react";
import { NavLink } from "react-router-dom";

function CallToAction({ setModal }) {
  return (
    <section className="section-call-to-action bg-primary">
      <div className="container content">
        <h2 className="title">Ready to get hired?</h2>
        <NavLink
          to="/"
          style={{ textDecoration: "none" }}
          onClick={() => setModal(true)}
        >
          <div className="cta-button">FIND JOBS!</div>
        </NavLink>
      </div>
    </section>
  );
}

export default CallToAction;
