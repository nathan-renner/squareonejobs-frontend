import React from "react";
import * as Yup from "yup";
import { FormField } from "../../forms";
import EditControls from "./EditControls";
import { Formik } from "formik";
import { MdClear } from "react-icons/md";
import FormDate from "./../../forms/FormDate";

const schema = Yup.object().shape({
  position: Yup.string().required().max(64).label("Degree"),
  company: Yup.string().required().max(64).label("School"),
  startDate: Yup.date().required().label("Start Date"),
  endDate: Yup.date().required().label("End Date"),
});

function WorkExperienceAddModal({
  setIsAdding,
  handleEditExperience,
  experienceToEdit: exp,
}) {
  const handleSubmit = (experience) => {
    handleEditExperience(experience, exp.index);
    setIsAdding(false);
  };
  const showWarning = (props) => {
    const { position, company, startDate, endDate } = props.values;

    if (
      position !== exp.experience.position ||
      company !== exp.experience.company ||
      startDate !== exp.experience.startDate ||
      endDate !== exp.experience.endDate
    ) {
      const result = window.confirm(
        "Are you sure you want to discard your changes?"
      );
      if (result) {
        setIsAdding(false);
        props.resetForm();
      }
    } else {
      setIsAdding(false);
    }
  };

  return (
    <Formik
      initialValues={exp.experience}
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
          <FormField name="position" placeholder="Position" label="Position" />
          <FormField
            name="company"
            placeholder="Company name"
            label="Company name"
          />
          <div className="date-container">
            <FormDate name="startDate" label="Start Date" />
            <FormDate name="endDate" label="End Date" />
          </div>
          <EditControls onCancel={() => showWarning(formProps)} />
        </>
      )}
    </Formik>
  );
}

export default WorkExperienceAddModal;
