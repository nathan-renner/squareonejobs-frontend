import React, { useState } from "react";
import Card from "./../../Card";
import { MdAdd, MdClear, MdModeEdit } from "react-icons/md";
import moment from "moment";
import EditControls from "./EditControls";
import WorkExperienceAddModal from "./WorkExperienceAddModal";
import Modal from "./../../Modal";

function WorkExperience({ portfolio, updateElement, ...otherProps }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  //const [tempData, setTempData] = useState(portfolio.workExperience);

  // const handleSubmit = () => {
  //   //updateElement("workExperience", tempData);
  //   setIsEditing(false);
  // };

  // const handleAddExperience = (experience) => {
  //   setIsEditing(true);
  //   const newWorkData = [...portfolio.workExperience];
  //   newWorkData.push(experience);
  //   setTempData(newWorkData);
  // };

  // const handleUpdateExperience = (experience, index) => {
  //   const newWorkData = [...portfolio.workExperience];
  //   newWorkData.splice(index, 1, experience);
  //   setTempData(newWorkData);
  // };

  // const handleRemoveExperience = (index) => {
  //   // Alert("Delete", "Are you sure you want to delete this item?", [
  //   //   { text: "No" },
  //   //   {
  //   //     text: "Yes",
  //   //     onPress: () => {
  //   //       const newWork = [...tempData];
  //   //       newWork.splice(index, 1);
  //   //       setTempData(newWork);
  //   //     },
  //   //   },
  //   // ]);
  // };

  return (
    <>
      {isAdding && (
        <Modal
          title="Add Experience"
          Content={WorkExperienceAddModal}
          componentProps={{ setIsAdding }}
        />
      )}
      <Card className="experience" {...otherProps}>
        <div className="control-icons">
          <MdAdd
            size={25}
            className={"control-icon"}
            onClick={() => setIsAdding(true)}
          />
          <MdModeEdit
            size={25}
            className={`control-icon ${isEditing ? "active" : null}`}
            onClick={() => setIsEditing(true)}
          />
        </div>
        <h2>Experience</h2>
        {portfolio.workExperience.map((experience, index) => (
          <div className="experience-container" key={index}>
            <div className="line" />
            <div className="left">
              <h3>{experience.title}</h3>
              <p>{experience.company}</p>
            </div>
            <p>
              {moment(experience.startDate).format("MM/YYYY") +
                " - " +
                moment(experience.endDate).format("MM/YYYY")}
            </p>
            {isEditing && <MdClear size={25} className="remove-icon" />}
          </div>
        ))}
        {isEditing && (
          <EditControls
            onSubmit={() => true}
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

export default WorkExperience;
