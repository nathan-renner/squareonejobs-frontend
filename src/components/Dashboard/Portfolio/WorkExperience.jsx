import React from "react";
import Card from "./../../Card";
import { MdModeEdit } from "react-icons/md";
import moment from "moment";

function WorkExperience({ workExperience, ...otherProps }) {
  return (
    <Card className="experience" {...otherProps}>
      <MdModeEdit size={25} className="edit-icon" />
      <h2>Experience</h2>
      {workExperience.map((experience, index) => (
        <div className="experience-container" key={index}>
          <div>
            <h3>{experience.title}</h3>
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
