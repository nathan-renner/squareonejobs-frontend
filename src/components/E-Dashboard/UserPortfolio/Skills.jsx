import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import Card from "./../../Card";

function Skills({ portfolio, ...otherProps }) {
  const [opened, setOpened] = useState(false);

  return (
    <Card className="skills" {...otherProps}>
      <h2>Skills</h2>
      <p className="title">Top Skills</p>
      <div className="top-skills">
        {portfolio.skills.top.map((skill) => (
          <p key={skill}>{skill}</p>
        ))}
      </div>
      <div className={`other-skills ${opened ? "opened" : null}`}>
        <div className="divider" />
        <p className="title">Other Skills</p>
        <div className="skills-container">
          {portfolio.skills.other.map((skill) => (
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
