import React from "react";
import EmployerReferencesIcon from "../../icons/EmployerReferencesIcon";
import UserPortfoliosIcon from "../../icons/UserPortfoliosIcon";

function EmployerReasons(props) {
  return (
    <section className="bg-light employer-reasons">
      <h1>Know who you're hiring</h1>
      <div className="container split">
        <div className="icon">
          <UserPortfoliosIcon />
        </div>
        <div className="icon">
          <EmployerReferencesIcon />
        </div>
      </div>
      <div className="container split">
        <div className="reason-1">
          <h2>View user's portfolios</h2>
          <p className="text-container">
            Learn about potential employees by viewing their skills, education,
            previous work experience, and much more.
          </p>
        </div>
        <div className="reason-2">
          <h2>Up-to-date employer references</h2>
          <p className="text-container">
            When users complete day jobs or part-time jobs and collect
            recommendations from other employers. You have full access to view
            any of their previous experiences with our service.
          </p>
        </div>
      </div>
    </section>
  );
}

export default EmployerReasons;
