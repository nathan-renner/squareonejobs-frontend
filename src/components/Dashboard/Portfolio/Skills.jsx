import React, { useState } from "react";
import { MdModeEdit, MdExpandLess, MdExpandMore } from "react-icons/md";
import Card from "./../../Card";

function Skills({ skills, ...otherProps }) {
  const [opened, setOpened] = useState(false);
  return (
    <Card className="skills" {...otherProps}>
      <MdModeEdit size={25} className="edit-icon" />
      <h2>Skills</h2>
      <p className="title">Top Skills</p>
      <div className="top-skills">
        {skills.slice(0, 3).map((skill) => (
          <p key={skill}>{skill}</p>
        ))}
      </div>
      <div className={`other-skills ${opened ? "opened" : null}`}>
        <div className="divider" />
        <p className="title">Other Skills</p>
        <div className="skills-container">
          {skills.slice(3).map((skill) => (
            <p key={skill}>{skill}</p>
          ))}
        </div>
      </div>
      <div className="divider" />
      <p className="see-more" onClick={() => setOpened(!opened)}>
        {opened ? "See less" : "See more"}
        {opened ? <MdExpandLess /> : <MdExpandMore height={30} />}
      </p>
    </Card>
  );
}

export default Skills;
