import React, { useState } from "react";
import CheckIconWhite from "../../icons/CheckIconWhite.jsx";
import { Button } from "./../../common";
import { useHistory } from "react-router-dom";

function Pricing(props) {
  const history = useHistory();
  const [active, setActive] = useState(0);

  return (
    <section className="bg-dark">
      <div className="container employer-pricing">
        <div className="text-container">
          <h2>Pricing</h2>
          <p>
            Our payment plans allow our services to be accessbile to any size
            company
          </p>
        </div>
        <div className="price-cards">
          <div
            className={`price-card top ${active === 0 ? "active" : null}`}
            onClick={() => setActive(0)}
          >
            <div className="price-header">
              <h3 className="price">
                <span>$</span>10
              </h3>
              <h3>Day Listing</h3>
            </div>
            <div className="price-body">
              <div className="button-container">
                <Button
                  outline
                  color="transparent"
                  textColor="white"
                  label="get started"
                  onClick={() => history.push("/auth/postjob")}
                />
              </div>
              <div>
                <div className="plan-perks">
                  <div className="perk-item">
                    <CheckIconWhite />
                    <p>Stays active for 30 days</p>
                  </div>
                  <div className="perk-item">
                    <CheckIconWhite />
                    <p>Easily choose your candidate</p>
                  </div>
                  <div className="perk-item">
                    <CheckIconWhite />
                    <p>View applicant's profiles and previous references</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className={`price-card  ${active === 1 ? "active" : null}`}
            onClick={() => setActive(1)}
          >
            <div className="price-header">
              <h3 className="price">
                <span>$</span>349<span>/month</span>
              </h3>
              <h3>Plus</h3>
            </div>
            <div className="price-body">
              <div className="button-container">
                <Button
                  outline
                  color="transparent"
                  textColor="white"
                  label="get started"
                />
              </div>
              <div>
                <div className="plan-perks">
                  <div className="perk-item">
                    <CheckIconWhite />
                    <p>5 listings per month</p>
                  </div>
                  <div className="perk-item">
                    <CheckIconWhite />
                    <p>15 day jobs per month*</p>
                  </div>
                  <div className="perk-item">
                    <CheckIconWhite />
                    <p>View applicant's profiles and previous references</p>
                  </div>
                  <div className="perk-item">
                    <CheckIconWhite />
                    <p>Access profiles of up to 50 additional users</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div
            className={`price-card bottom ${active === 2 ? "active" : null}`}
            onClick={() => setActive(2)}
          >
            <div className="price-header">
              <h3 className="price">
                <span>$</span>200
              </h3>
              <h3>Full-time & Part-time</h3>
            </div>
            <div className="price-body">
              <div className="button-container">
                <Button
                  outline
                  color="transparent"
                  textColor="white"
                  label="get started"
                  onClick={() => history.push("/auth/postjob")}
                />
              </div>
              <div>
                <div className="plan-perks">
                  <div className="perk-item">
                    <CheckIconWhite />
                    <p>Stays active for 30 days</p>
                  </div>
                  <div className="perk-item">
                    <CheckIconWhite />
                    <p>Access full database of top-level talent</p>
                  </div>
                  <div className="perk-item">
                    <CheckIconWhite />
                    <p>View applicant's profiles and previous references</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className={`price-card ${active === 1 ? "active" : null}`}
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
            className={`price-card ${active === 2 ? "active" : null}`}
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
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
