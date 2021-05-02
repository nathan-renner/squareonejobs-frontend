import React, { useState } from "react";
import moment from "moment";
import { MdAdd, MdModeEdit } from "react-icons/md";

import Card from "./../../Card";
import Modal from "./../../Modal";
import EducationAddModal from "./EducationAddModal";
import EducationModal from "./EducationModal";

function Education({ portfolio, updateElement, ...otherProps }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [educationToEdit, setEducationToEdit] = useState({
    education: {
      degree: "",
      school: "",
      startDate: undefined,
      endDate: undefined,
    },
    index: undefined,
  });

  const handleEditEducation = (education, index) => {
    const newEducationData = [...portfolio.education];

    if (index !== undefined) newEducationData.splice(index, 1, education);
    else newEducationData.push(education);
    updateElement("education", newEducationData);
  };

  return (
    <>
      <Modal
        visible={isEditing}
        title="Edit Education"
        Content={EducationModal}
        componentProps={{
          setIsEditing,
          education: portfolio.education,
          setEducationToEdit,
          setIsEditingEducation,
          updateElement,
        }}
      />
      {isEditingEducation && (
        <Modal
          title="Add Education"
          Content={EducationAddModal}
          componentProps={{
            setIsEditingEducation,
            handleEditEducation,
            educationToEdit,
          }}
        />
      )}
      <Card className="education" {...otherProps}>
        <div className="control-icons">
          <MdAdd
            size={25}
            className={"control-icon"}
            onClick={() => {
              setEducationToEdit({
                education: {
                  degree: "",
                  school: "",
                  startDate: undefined,
                  endDate: undefined,
                },
                index: undefined,
              });
              setIsEditingEducation(true);
            }}
          />
          <MdModeEdit
            size={25}
            className={`control-icon ${isEditing ? "active" : null}`}
            onClick={() => setIsEditing(true)}
          />
        </div>
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
                {moment(edu.startDate).format("MM/YYYY") +
                  " - " +
                  moment(edu.endDate).format("MM/YYYY")}
              </p>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}

export default Education;
