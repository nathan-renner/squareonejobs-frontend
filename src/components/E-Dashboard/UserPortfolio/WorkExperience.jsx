import React from "react";
import moment from "moment";
import Card from "./../../Card";

function WorkExperience({ portfolio, ...otherProps }) {
  return (
    <Card className="experience" {...otherProps}>
      <h2>Experience</h2>
      {portfolio.workExperience.map((experience, index) => (
        <div className={`experience-container`} key={index}>
          <div className="line" />
          <div className="left">
            <h3>{experience.position}</h3>
            <p>{experience.company}</p>
          </div>
          <p>
            {moment(experience.startDate).format("MM/YYYY") +
              " - " +
              moment(experience.endDate).format("MM/YYYY")}
          </p>
        </div>
      ))}
    </Card>
  );
}

export default WorkExperience;
