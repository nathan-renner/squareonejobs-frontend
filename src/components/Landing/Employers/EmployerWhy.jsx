import React from "react";
import OvercomeIcon from "../../icons/OvercomeIcon";
import Card from "../../Card";

function EmployerWhy(props) {
  return (
    <section className="bg-dark employer-problem">
      <div className="container split feature-container">
        <div className="left">
          <OvercomeIcon className="overcome-icon" />
          <h2 className="text-white">
            Our users have <span className="text-primary">overcome</span> their
            obstacles
          </h2>
          <p className="subtitle text-white">
            Now they're ready to help you overcome yours
          </p>
        </div>
        <div className="right">
          <div className="reason">
            <Card>
              <h3>Transcending adversity builds character</h3>
              <p>
                There are over <span>70 million</span> individuals in the U.S.
                justice involved community alone. Every one of them has
                transcended their obstacles and are telling their stories of
                transformation and growth.
              </p>
            </Card>
            <h3>Transcending adversity builds character</h3>
          </div>
          <div className="reason-2">
            <Card>
              <h3>Second chances inspire loyalty</h3>
              <p>
                "People appreciate a second chance, and their productivity
                proves it"<br></br>
                <br></br> -Laureen Asseo,<br></br> CEO of Fresh n' Lean
              </p>
            </Card>
            <h3>Second chances inspire loyalty</h3>
          </div>
          <div className="reason-3">
            <Card>
              <h3>Qualify for tax incentives with WOTC</h3>
              <p>
                Many of our users qualify for the Work Opportunity Tax Credit
                <br></br>
                <br></br> This can save you up to 40% of their first-year wage.
              </p>
            </Card>
            <h3>Qualify for tax incentives with WOTC</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployerWhy;
