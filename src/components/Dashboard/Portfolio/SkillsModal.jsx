import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import WarningModal from "../../WarningModal";
import { MdClear } from "react-icons/md";
import EditControls from "./EditControls";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "lightgrey" : "white",
  ...draggableStyle,
});

function SkillsModal({ portfolio, updateElement, setIsEditingSkills }) {
  const [warningVisible, setWarningVisible] = useState(false);
  const [tempSkills, setTempSkills] = useState(portfolio.skills);

  const handleSubmit = () => {
    updateElement("skills", tempSkills);
    setIsEditingSkills(false);
  };
  const showWarning = () => {
    setWarningVisible(true);
  };
  const onCancel = () => {
    setWarningVisible(false);
  };
  const onDiscard = () => {
    setWarningVisible(false);
    setIsEditingSkills();
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      portfolio.skills,
      result.source.index,
      result.destination.index
    );
    setTempSkills(items);
  };

  return (
    <>
      <WarningModal
        visible={warningVisible}
        title="Discard Changes?"
        message="Are you sure you want to discard your changes?"
        submitText="Discard"
        onCancel={onCancel}
        onSubmit={onDiscard}
      />
      <MdClear size={25} className="exit" onClick={showWarning} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="skills-modal"
            >
              {tempSkills.map((skill, index) => (
                <Draggable key={skill} draggableId={skill} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {skill}
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
