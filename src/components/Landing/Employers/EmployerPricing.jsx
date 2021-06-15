import React from "react";
import CheckIconWhite from "../../icons/CheckIconWhite.jsx";

function EmployerPricing(props) {
  return (
    <section className="bg-dark employer-pricing">
      <div className="container split">
        <div className="text-container">
          <h2>Pricing</h2>
          <p>
            Our comprehensive payment plans allow our services to be accessbile
            to any size company
          </p>
        </div>
        <div className="price-cards">
          <div className="standard-card split">
            <div className="left">
              <p className="standard-price">$99</p>
              <div className="button-container">
                <button className="standard-button">GET STARTED</button>
              </div>
            </div>
            <div className="right">
              <p className="standard-label">Standard</p>
              <div className="standard-perks">
                <div>
                  <CheckIconWhite />
                  <p>words</p>
                </div>
                <div>
                  <CheckIconWhite />
                  <p>more words</p>
                </div>
                <div>
                  <CheckIconWhite />
                  <p>aaaaaAAAAAA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployerPricing;
