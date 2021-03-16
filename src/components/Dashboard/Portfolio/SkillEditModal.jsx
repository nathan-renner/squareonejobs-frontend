import React from "react";
import * as Yup from "yup";
import { FormField } from "../../forms";
import { MdClear } from "react-icons/md";
import EditControls from "./EditControls";
import { Formik } from "formik";

const schema = Yup.object().shape({
  skill: Yup.string().required().min(1).max(32).label("Skill"),
});

function SkillEditModal({ handleEditSkill, skillToEdit, setIsEditingSkill }) {
  const handleSubmit = (values, { resetForm }) => {
    handleEditSkill({
      skill: values.skill,
      cat: skillToEdit.cat,
      index: skillToEdit.index,
    });
    setIsEditingSkill(false);
    resetForm();
  };
  const showWarning = (props) => {
    if (props.values.skill !== "") {
      const result = window.confirm(
        "Are you sure you want to discard your changes?"
      );
      if (result) {
        setIsEditingSkill(false);
        props.resetForm();
      }
    } else {
      setIsEditingSkill(false);
    }
  };

  return (
    <Formik
      initialValues={{ skill: skillToEdit.skill }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {(formProps) => (
        <>
          <MdClear
            size={25}
            className="exit"
            onClick={() => showWarning(formProps)}
          />
          <FormField
            maxLength="250"
            name="skill"
            placeholder="E.g. Communication, Finance, HTML..."
          />
          <EditControls onCancel={showWarning} />
        </>
      )}
    </Formik>
  );
}

export default SkillEditModal;
