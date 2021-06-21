import React, { useState } from "react";
import dayjs from "dayjs";
import { MdAdd, MdDelete, MdModeEdit } from "react-icons/md";

import EditControls from "./EditControls";
import WorkExperienceAddModal from "./WorkExperienceAddModal";

import { Card, Modal } from "../../common";

function WorkExperience({ portfolio, updateElement, ...otherProps }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState({
    experience: {
      position: "",
      company: "",
      startDate: undefined,
      endDate: undefined,
    },
    index: undefined,
  });

  const handleEditExperience = (experience, index) => {
    const newExpData = [...portfolio.workExperience];

    if (index !== undefined) newExpData.splice(index, 1, experience);
    else newExpData.push(experience);
    updateElement("workExperience", newExpData);
  };

  const handleRemoveExperience = (index) => {
    const response = window.confirm(
      "Are you sure you want to delete this experience?"
    );
    if (response) {
      const temp = [...portfolio.workExperience];
      temp.splice(index, 1);
      updateElement("workExperience", temp);
    }
  };

  return (
    <>
      {isAdding && (
        <Modal
          title="Add Experience"
          Content={WorkExperienceAddModal}
          componentProps={{
            setIsAdding,
            handleEditExperience,
            experienceToEdit,
          }}
        />
      )}
      <Card className="experience" {...otherProps}>
        <div className="control-icons">
          <MdAdd
            size={25}
            className={"control-icon"}
            onClick={() => {
              setExperienceToEdit({
                experience: {
                  position: "",
                  company: "",
                  startDate: undefined,
                  endDate: undefined,
                },
                index: undefined,
              });
              setIsAdding(true);
            }}
          />
          <MdModeEdit
            size={25}
            className={`control-icon ${isEditing ? "active" : null}`}
            onClick={() => setIsEditing(true)}
          />
        </div>
        <h2>Experience</h2>
        {portfolio.workExperience.map((experience, index) => (
          <div
            className={`experience-container ${isEditing ? "edit" : null}`}
            key={index}
          >
            <div className="line" />
            <div
              className="left"
              onClick={() => {
                setExperienceToEdit({ experience, index });
                setIsAdding(true);
              }}
            >
              <h3>{experience.position}</h3>
              <p>{experience.company}</p>
            </div>
            <p>
              {dayjs(experience.startDate).format("MM/YYYY") +
                " - " +
                dayjs(experience.endDate).format("MM/YYYY")}
            </p>
            {isEditing && (
              <MdDelete
                size={25}
                className="remove-icon"
                onClick={() => handleRemoveExperience(index)}
              />
            )}
          </div>
        ))}
        {isEditing && (
          <EditControls
            onSubmit={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </Card>
    </>
  );
}

export default WorkExperience;
