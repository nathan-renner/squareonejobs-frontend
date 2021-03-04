import React, { useState } from "react";
import moment from "moment";
import Card from "./../../Card";
import { MdAdd, MdClear, MdModeEdit } from "react-icons/md";
import EditControls from "./EditControls";
import Modal from "./../../Modal";
import EducationAddModal from "./EducationAddModal";

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
  //const [tempData, setTempData] = useState(portfolio.education);

  const handleSubmit = () => {
    //updateElement("education", tempData);
    setIsEditing(false);
  };

  const handleEditEducation = (education, index) => {
    const newEducationData = [...portfolio.education];

    if (index !== undefined) newEducationData.splice(index, 1, education);
    else newEducationData.push(education);
    updateElement("education", newEducationData);
  };

  // const handleRemoveEducation = (index) => {
  //   // Alert("Delete", "Are you sure you want to delete this item?", [
  //   //   { text: "No" },
  //   //   {
  //   //     text: "Yes",
  //   //     onPress: () => {
  //   //       const newEducation = [...tempData];
  //   //       newEducation.splice(index, 1);
  //   //       setTempData(newEducation);
  //   //     },
  //   //   },
  //   // ]);
  // };

  return (
    <>
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
          <div
            className={`education-container ${isEditing ? "active" : null}`}
            key={index}
            onClick={() => {
              setEducationToEdit({ education: edu, index });
              setIsEditingEducation(true);
            }}
          >
            <div className="line" />
            <div className="left">
              <h3>{edu.degree}</h3>
              <p>{edu.school}</p>
            </div>
            <p>
              {moment(edu.startDate).format("MM/YYYY") +
                " - " +
                moment(edu.endDate).format("MM/YYYY")}
            </p>
            {isEditing && <MdClear size={25} className="remove-icon" />}
          </div>
        ))}
        {isEditing && (
          <EditControls
            onSubmit={() => setIsEditing(false)}
            onCancel={() => {
              //setTempData(portfolio.education);
              setIsEditing(false);
            }}
          />
        )}
      </Card>
    </>
  );
}

export default Education;
