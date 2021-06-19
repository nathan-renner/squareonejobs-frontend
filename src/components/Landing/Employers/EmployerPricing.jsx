import React, { useState } from "react";
import CheckIconWhite from "../../icons/CheckIconWhite.jsx";

function EmployerPricing(props) {
  const [active, setActive] = useState(1);

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
          <div
            className={`standard-card split ${active === 0 ? "active" : null}`}
            onClick={() => setActive(0)}
          >
            <div className="left">
              <p className="dollar-sign">$</p>
              <p className="plan-price">99</p>
              <div className="button-container">
                <button className="plan-button">GET STARTED</button>
              </div>
            </div>
            <div className="right">
              <p className="plan-label">Standard</p>
              <div className="plan-perks">
                <div className="perk-item">
                  <CheckIconWhite />
                  <p>words</p>
                </div>
                <div className="perk-item">
                  <CheckIconWhite />
                  <p>more words</p>
                </div>
                <div className="perk-item">
                  <CheckIconWhite />
                  <p>aaaaaAAAAAA</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`premium-card split ${active === 1 ? "active" : null}`}
            onClick={() => setActive(1)}
          >
            <div className="left">
              <p className="dollar-sign">$</p>
              <p className="plan-price">149</p>
              <div className="button-container">
                <button className="plan-button">GET STARTED</button>
              </div>
            </div>
            <div className="right">
              <p className="plan-label">Premium</p>
              <div className="plan-perks">
                <div className="perk-item">
                  <CheckIconWhite />
                  <p>words</p>
                </div>
                <div className="perk-item">
                  <CheckIconWhite />
                  <p>more words</p>
                </div>
                <div className="perk-item">
                  <CheckIconWhite />
                  <p>aaaaaAAAAAA</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`subscription-card split ${
              active === 2 ? "active" : null
            }`}
            onClick={() => setActive(2)}
          >
            <div className="left">
              <p className="dollar-sign">$</p>
              <p className="plan-price">199</p>
              <p className="month">/month</p>
              <div className="button-container">
                <button className="plan-button">GET STARTED</button>
              </div>
            </div>
            <div className="right">
              <p className="plan-label">Subscription</p>
              <div className="plan-perks">
                <div className="perk-item">
                  <CheckIconWhite />
                  <p>words</p>
                </div>
                <div className="perk-item">
                  <CheckIconWhite />
                  <p>more words</p>
                </div>
                <div className="perk-item">
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
