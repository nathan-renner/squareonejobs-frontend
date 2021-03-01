import React from "react";
import moment from "moment";
import Card from "./../../Card";
import { MdModeEdit } from "react-icons/md";

function Education({ education, ...otherProps }) {
  return (
    <Card className="education" {...otherProps}>
      <MdModeEdit size={25} className="edit-icon" />
      <h2>Education</h2>
      {education.map((edu, index) => (
        <div className="education-container" key={index}>
          <div>
            <h3>{edu.degree}</h3>
            <p>{edu.school}</p>
          </div>
          <p>
            {moment(edu.startDate).format("MM/YYYY") +
              " - " +
              moment(edu.endDate).format("MM/YYYY")}
          </p>
        </div>
      ))}
    </Card>
  );
}

export default Education;
