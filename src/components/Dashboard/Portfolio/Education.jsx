import React, { useState } from "react";
import moment from "moment";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdAdd, MdDelete, MdDragHandle, MdModeEdit } from "react-icons/md";

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

  const handleEditEducation = (education, index) => {
    const newEducationData = [...portfolio.education];

    if (index !== undefined) newEducationData.splice(index, 1, education);
    else newEducationData.push(education);
    updateElement("education", newEducationData);
  };

  const handleRemoveEducation = (index) => {
    const response = window.confirm(
      "Are you sure you want to delete this education?"
    );
    if (response) {
      const temp = [...portfolio.education];
      temp.splice(index, 1);
      updateElement("education", temp);
    }
  };

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
      <Card className="education">
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
        {isEditing ? (
          <>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppableEducation">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ ...snapshot.isDraggingOver }}
                  >
                    {portfolio.education.map((edu, index) => (
                      <Draggable
                        index={index}
                        draggableId={`${edu.degree} - ${index}`}
                        key={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`education-container ${
                              isEditing ? "edit" : null
                            } ${snapshot.isDragging ? "active" : null}`}
                            style={{
                              ...provided.draggableProps.style,
                            }}
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
                            <div className="right">
                              <p>
                                {moment(edu.startDate).format("MM/YYYY") +
                                  " - " +
                                  moment(edu.endDate).format("MM/YYYY")}
                              </p>

                              <MdDelete
                                size={25}
                                className="remove-icon"
                                onClick={() => handleRemoveEducation(index)}
                              />
                              <MdDragHandle size={25} className="drag" />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {isEditing && (
              <EditControls
                onSubmit={() => setIsEditing(false)}
                onCancel={() => setIsEditing(false)}
              />
            )}
          </>
        ) : (
          <>
            {portfolio.education.map((edu, index) => (
              <div
                className={`education-container`}
                key={index}
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
                </div>
              </div>
            ))}
          </>
        )}
      </Card>
    </>
  );
}

export default Education;
