import React from "react";
import * as Yup from "yup";
import WarningModal from "../../WarningModal";
import { useState } from "react";
import { Form, FormField } from "../../forms";
import { MdClear } from "react-icons/md";
import EditControls from "./EditControls";

const schema = Yup.object().shape({
  skill: Yup.string().required().min(1).max(32).label("Skill"),
});

function SkillEditModal({
  handleEditSkill,
  handleCancelEditSkill,
  skillToEdit,
  setIsEditingSkill,
}) {
  const [warningVisible, setWarningVisible] = useState(false);

  const handleSubmit = ({ skill }) => {
    handleEditSkill({ skill: skill, index: skillToEdit.index });
    setIsEditingSkill(false);
  };
  const showWarning = () => {
    setWarningVisible(true);
  };
  const onCancel = () => {
    setWarningVisible(false);
  };
  const onDiscard = () => {
    setWarningVisible(false);
    handleCancelEditSkill();
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
      <Form
        initialValues={{ skill: skillToEdit.skill }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <MdClear size={25} className="exit" onClick={showWarning} />
        <FormField
          maxLength="250"
          name="skill"
          placeholder="E.g. Communication, Finance, HTML..."
        />
        <EditControls onCancel={showWarning} />
      </Form>
    </>
  );
}

export default SkillEditModal;
