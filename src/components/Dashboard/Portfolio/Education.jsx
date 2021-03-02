import React, { useState } from "react";
import moment from "moment";
import Card from "./../../Card";
import { MdAdd, MdClear, MdModeEdit } from "react-icons/md";
import EditControls from "./EditControls";
import Modal from "./../../Modal";
import EducationAddModal from "./EducationAddModal";

const portfolio = {
  education: [
    {
      degree: "Degree asdfas dfa fasdf asdf  asfasd fas fsadf",
      school: "School",
      startDate: moment(),
      endDate: moment().add(4, "years"),
    },
    {
      degree: "Degree",
      school: "School",
      startDate: moment(),
      endDate: moment().add(4, "years"),
    },
  ],
};

function Education({ ...otherProps }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  //const [tempData, setTempData] = useState(portfolio.education);

  // const handleSubmit = () => {
  //   //updateElement("education", tempData);
  //   setIsEditing(false);
  // };

  // const handleAddEducation = (education) => {
  //   setIsEditing(true);
  //   const newEducationData = [...portfolio.education];
  //   newEducationData.push(education);
  //   //setTempData(newEducationData);
  // };

  // const handleUpdateEducation = (education, index) => {
  //   const newEducationData = [...portfolio.education];
  //   newEducationData.splice(index, 1, education);
  //   // setTempData(newEducationData);
  // };

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
      {isAdding && (
        <Modal
          title="Add Education"
          Content={EducationAddModal}
          componentProps={{ setIsAdding }}
        />
      )}
      <Card className="education" {...otherProps}>
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
        <h2>Education</h2>
        {portfolio.education.map((edu, index) => (
          <div className="education-container" key={index}>
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

export default Education;
