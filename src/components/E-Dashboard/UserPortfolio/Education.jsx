import React from "react";
import dayjs from "dayjs";

import { Card } from "../../common";

function Education({ portfolio, ...otherProps }) {
  return (
    <Card className="education" {...otherProps}>
      <h2>Education</h2>
      {portfolio.education.map((edu, index) => (
        <div className={`education-container`} key={index}>
          <div className="line" />
          <div className="left">
            <h3>{edu.degree}</h3>
            <p>{edu.school}</p>
          </div>
          <div className="right">
            <p>
              {dayjs(edu.startDate).format("MM/YYYY") +
                " - " +
                dayjs(edu.endDate).format("MM/YYYY")}
            </p>
          </div>
        </div>
      ))}
    </Card>
  );
}

export default Education;
