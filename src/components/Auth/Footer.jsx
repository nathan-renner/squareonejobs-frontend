import React from "react";
import { NavLink } from "react-router-dom";

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-content">
        <div />
        <div className="google-text">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
        </div>
        <NavLink to="/" className="copyright">
          © {new Date().getFullYear()} SquareOneJobs
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
