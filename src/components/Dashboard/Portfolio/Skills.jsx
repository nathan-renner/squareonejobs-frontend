import React, { useState } from "react";
import { MdModeEdit, MdExpandLess, MdExpandMore, MdAdd } from "react-icons/md";

import SkillEditModal from "./SkillEditModal";
import SkillsModal from "./SkillsModal";

import { Card, Modal } from "../../common";

function Skills({ portfolio, updateElement, ...otherProps }) {
  const [opened, setOpened] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState({
    skill: "",
    cat: "other",
    index: undefined,
  });

  // const handleSubmit = () => {
  //   updateElement("skills", tempData);
  //   setIsEditing(false);
  // };

  const handleEditSkill = ({ skill, cat, index }) => {
    setIsEditingSkill(false);
    const temp = { ...portfolio.skills };

    if (index !== undefined) temp[cat].splice(index, 1, skill);
    else temp[cat].push(skill);
    updateElement("skills", temp);
  };

  return (
    <>
      <Modal
        visible={isEditingSkill}
        className="modal-sm"
        title="Add a skill"
        Content={SkillEditModal}
        componentProps={{
          skillToEdit,
          handleEditSkill,
          setIsEditingSkill,
        }}
      />
      <Modal
        visible={isEditingSkills}
        className="modal"
        title="Your skills"
        Content={SkillsModal}
        componentProps={{
          updateElement,
          portfolio,
          setIsEditingSkills,
        }}
      />
      <Card className="skills" {...otherProps}>
        <div className="control-icons">
          <MdAdd
            size={25}
            className={"control-icon"}
            onClick={() => {
              setIsEditingSkill(true);
              setSkillToEdit({ skill: "", cat: "other", index: undefined });
            }}
          />
          <MdModeEdit
            size={25}
            className={`control-icon ${isEditingSkills ? "active" : null}`}
            onClick={() => {
              setOpened(true);
              setIsEditingSkills(true);
            }}
          />
        </div>
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
        {!isEditingSkills && (
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
