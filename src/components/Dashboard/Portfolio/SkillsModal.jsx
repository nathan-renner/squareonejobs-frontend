import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  MdClear,
  MdStarBorder,
  MdStar,
  MdDelete,
  MdDragHandle,
} from "react-icons/md";
import EditControls from "./EditControls";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (draggableStyle) => ({
  ...draggableStyle,
});

function SkillsModal({
  visible,
  portfolio,
  updateElement,
  setIsEditingSkills,
}) {
  const [top, setTop] = useState(portfolio.skills.top);
  const [other, setOther] = useState(portfolio.skills.other);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!visible) {
      setTop(portfolio.skills.top);
      setOther(portfolio.skills.other);
    }
  }, [visible, portfolio.skills.top, portfolio.skills.other]);

  const handleSubmit = () => {
    updateElement("skills", { top, other });
    setIsEditingSkills(false);
  };
  const showWarning = () => {
    if (top !== portfolio.skills.top || other !== portfolio.skills.other) {
      const result = window.confirm(
        "Are you sure you want to discard your changes?"
      );
      return result ? setIsEditingSkills(false) : null;
    } else {
      setIsEditingSkills(false);
    }
  };
  const handleRemoveSkill = (index, cat) => {
    const result = window.confirm(
      "Are you sure you want to remove this skill?"
    );
    if (result) {
      const temp = cat === "top" ? [...top] : [...other];
      temp.splice(index, 1);
      cat === "top" ? setTop(temp) : setOther(temp);
    }
  };
  const handleRemoveTop = (index) => {
    const tempTop = [...top];
    const tempOther = [...other];
    const skill = tempTop.splice(index, 1);
    tempOther.push(skill);
    setTop(tempTop);
    setOther(tempOther);
  };
  const handleAddTop = (index) => {
    if (top.length === 3)
      window.alert(
        "You may not select more than 3 Top Skills. Remove one to select something different."
      );
    else {
      const tempTop = [...top];
      const tempOther = [...other];
      const skill = tempOther.splice(index, 1);
      tempTop.push(skill);
      setTop(tempTop);
      setOther(tempOther);
    }
  };

  const onDragStart = (cat) => {
    setDragging(cat);
  };

  const onDragEnd = (result, cat) => {
    setDragging(false);
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    if (cat === "top") {
      const items = reorder(top, result.source.index, result.destination.index);
      setTop(items);
    } else {
      const items = reorder(
        other,
        result.source.index,
        result.destination.index
      );
      setOther(items);
    }
  };
  return (
    <>
      <MdClear size={25} className="exit" onClick={showWarning} />
      <DragDropContext
        onDragStart={() => onDragStart("top")}
        onDragEnd={(result) => onDragEnd(result, "top")}
      >
        <Droppable droppableId="droppableTop">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`skills-droppable ${
                dragging === "other" ? "disabled" : null
              }`}
            >
              <p className="title">Top Skills</p>
              {top.map((skill, index) => (
                <Draggable
                  key={skill}
                  draggableId={`${skill} - ${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(provided.draggableProps.style)}
                      className={`skill-container ${
                        snapshot.isDragging ? "active" : null
                      }`}
                      //className="sk"
                    >
                      <div className="skill">
                        <MdStar
                          size={25}
                          className="skill-icon active"
                          onClick={() => handleRemoveTop(index)}
                        />
                        <p>{skill}</p>
                        <MdDelete
                          size={25}
                          className="skill-icon"
                          onClick={() => handleRemoveSkill(index, "top")}
                        />
                        <MdDragHandle size={25} className="skill-icon" />
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
      <div className="divider" />
      <DragDropContext
        onDragStart={() => onDragStart("other")}
        onDragEnd={(result) => onDragEnd(result, "other")}
      >
        <Droppable droppableId="droppableOther">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`skills-droppable ${
                dragging === "top" ? "disabled" : null
              }`}
            >
              <p className="title">Other Skills</p>
              {other.map((skill, index) => (
                <Draggable
                  key={skill}
                  draggableId={`${skill} - ${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(provided.draggableProps.style)}
                      className={`skill-container ${
                        snapshot.isDragging ? "active" : null
                      }`}
                    >
                      <div className="skill">
                        <MdStarBorder
                          size={25}
                          className="skill-icon"
                          onClick={() => handleAddTop(index)}
                        />
                        <p>{skill}</p>
                        <MdDelete
                          size={25}
                          className="skill-icon"
                          onClick={() => handleRemoveSkill(index, "other")}
                        />
                        <MdDragHandle size={25} className="skill-icon" />
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
      <EditControls onCancel={showWarning} onSubmit={handleSubmit} />
    </>
  );
}

export default SkillsModal;
