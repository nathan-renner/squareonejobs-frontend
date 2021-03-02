import React, { useState } from "react";
import { MdModeEdit, MdExpandLess, MdExpandMore, MdAdd } from "react-icons/md";
import Card from "./../../Card";
import EditControls from "./EditControls";
import Modal from "./../../Modal";
import SkillEditModal from "./SkillEditModal";

const portfolio = {
  skills: [
    "skill1",
    "skill2",
    "skill3",
    "skill4",
    "skill5",
    "skill6",
    "skill7",
  ],
};

function Skills({ skills, updateElement, ...otherProps }) {
  const [opened, setOpened] = useState(false);
  //const [tempData, setTempData] = useState(portfolio.skills);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [skillToEdit] = useState("");

  return (
    <>
      {isAdding && (
        <Modal
          className="modal-sm"
          title="Add a skill"
          Content={SkillEditModal}
          componentProps={{ skillToEdit, updateElement, setIsAdding }}
        />
      )}
      <Card className="skills" {...otherProps}>
        <div className="control-icons">
          <MdAdd
            size={25}
            className={"control-icon"}
            onClick={() => setIsAdding(true)}
          />
          <MdModeEdit
            size={25}
            className={`control-icon ${isEditing ? "active" : null}`}
            onClick={() => {
              setOpened(true);
              setIsEditing(true);
            }}
          />
        </div>
        <h2>Skills</h2>
        <p className="title">Top Skills</p>
        <div className="top-skills">
          {portfolio.skills.slice(0, 3).map((skill) => (
            <p key={skill}>{skill}</p>
          ))}
        </div>
        <div className={`other-skills ${opened ? "opened" : null}`}>
          <div className="divider" />
          <p className="title">Other Skills</p>
          <div className="skills-container">
            {portfolio.skills.slice(3).map((skill) => (
              <p key={skill}>{skill}</p>
            ))}
          </div>
        </div>
        {isEditing && (
          <EditControls
            onSubmit={() => true}
            onCancel={() => {
              //setTempData(portfolio.skills);
              setIsEditing(false);
            }}
          />
        )}
        {!isEditing && (
          <>
            <div className="divider" />
            <p className="see-more" onClick={() => setOpened(!opened)}>
              {opened ? "See less" : "See more"}
              {opened ? <MdExpandLess /> : <MdExpandMore height={30} />}
            </p>
          </>
        )}
      </Card>
    </>
  );
}

export default Skills;
