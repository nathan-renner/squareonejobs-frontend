import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdDelete, MdDragHandle } from "react-icons/md";
import EditControls from "./EditControls";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function EducationModal({
  education,
  isEditing,
  setIsEditing,
  updateElement,
  setEducationToEdit,
  setIsEditingEducation,
}) {
  const [tempData, setTempData] = useState(education);

  useEffect(() => {
    setTempData(education);
  }, [education]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      tempData,
      result.source.index,
      result.destination.index
    );
    setTempData(items);
  };

  const handleRemoveEducation = (index) => {
    const response = window.confirm(
      "Are you sure you want to delete this education?"
    );
    if (response) {
      const temp = [...tempData];
      temp.splice(index, 1);
      setTempData(temp);
    }
  };

  const handleSubmit = () => {
    updateElement("education", tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    const result = window.confirm(
      "Are you sure you want to discard your changes?"
    );
    if (result) {
      setTempData(education);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppableEducation">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ ...snapshot.isDraggingOver }}
            >
              {tempData.map((edu, index) => (
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
                    >
                      <div className="line" />
                      <div
                        className="left"
                        onClick={() => {
                          setEducationToEdit({ education: edu, index });
                          setIsEditingEducation(true);
                        }}
                      >
                        <h3>{edu.degree}</h3>
                        <p>{edu.school}</p>
                      </div>
                      <div className="right">
                        <p>
                          {dayjs(edu.startDate).format("MM/YYYY") +
                            " - " +
                            dayjs(edu.endDate).format("MM/YYYY")}
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
      <EditControls onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

export default EducationModal;
