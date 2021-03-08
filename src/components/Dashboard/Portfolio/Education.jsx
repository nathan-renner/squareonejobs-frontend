import React, { useState } from "react";
import moment from "moment";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdAdd, MdClear, MdDragHandle, MdModeEdit } from "react-icons/md";

import Card from "./../../Card";
import EditControls from "./EditControls";
import Modal from "./../../Modal";
import EducationAddModal from "./EducationAddModal";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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
  const [length] = useState(portfolio ? portfolio.education.length : 0);
  //const [tempData, setTempData] = useState(portfolio.education);

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    background: isDragging ? "lightgrey" : "white",
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({});

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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      portfolio.education,
      result.source.index,
      result.destination.index
    );
    updateElement("education", items);
  };

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
        <DragDropContext onDragEnd={onDragEnd}>
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
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {portfolio.education.map((edu, index) => (
                  <Draggable index={index} draggableId={edu.degree} key={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`education-container ${
                          isEditing ? "active" : null
                        }`}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        // onClick={() => {
                        //   setEducationToEdit({ education: edu, index });
                        //   setIsEditingEducation(true);
                        // }}
                      >
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
                          <MdDragHandle size={25} className="drag" />
                        </div>
                        {isEditing && (
                          <MdClear size={25} className="remove-icon" />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {isEditing && (
            <EditControls
              onSubmit={() => setIsEditing(false)}
              onCancel={() => {
                //setTempData(portfolio.education);
                setIsEditing(false);
              }}
            />
          )}
        </DragDropContext>
      </Card>
    </>
  );
}

export default Education;
