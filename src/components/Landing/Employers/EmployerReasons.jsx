import React from "react";
import EmployerReferencesIcon from "../../icons/EmployerReferencesIcon";
import UserPortfoliosIcon from "../../icons/UserPortfoliosIcon";

function EmployerReasons(props) {
  return (
    <section className="bg-light employer-reasons">
      <div className="container">
        <h2>Know who you're hiring</h2>
        <div className="reasons">
          <div>
            <UserPortfoliosIcon className="icon" />
            <h3>View user's portfolios</h3>
            <div className="divider" />
            <p>
              Learn about potential employees by viewing their skills,
              education, previous work experience, and much more.
            </p>
          </div>
          <div>
            <EmployerReferencesIcon className="icon" />
            <h3>Up-to-date employer references</h3>
            <div className="divider secondary" />
            <p>
              When users complete day jobs or part-time jobs and collect
              recommendations from other employers. You have full access to view
              any of their previous experiences with our service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployerReasons;
