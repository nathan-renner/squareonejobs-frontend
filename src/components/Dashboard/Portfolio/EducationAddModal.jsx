import React, { useState } from "react";
import * as Yup from "yup";
import { FormField } from "../../forms";
import EditControls from "./EditControls";
import FormDatePicker from "./../../forms/FormDatePicker";
import { Formik } from "formik";
import { MdClear } from "react-icons/md";

const schema = Yup.object().shape({
  degree: Yup.string().required().max(64).label("Degree"),
  school: Yup.string().required().max(64).label("School"),
  startDate: Yup.date().required().label("Start Date"),
  endDate: Yup.date().required().label("End Date"),
});

function EducationAddModal({
  setIsEditingEducation,
  handleEditEducation,
  educationToEdit: edu,
}) {
  const handleSubmit = (education) => {
    handleEditEducation(education, edu.index);
    setIsEditingEducation(false);
  };

  const showWarning = (props) => {
    const { degree, school, startDate, endDate } = props.values;

    if (
      degree !== edu.education.degree ||
      school !== edu.education.school ||
      startDate !== edu.education.startDate ||
      endDate !== edu.education.endDate
    ) {
      const result = window.confirm(
        "Are you sure you want to discard your changes?"
      );
      if (result) {
        setIsEditingEducation(false);
        props.resetForm();
      }
    } else {
      setIsEditingEducation(false);
    }
  };

  return (
    <Formik
      initialValues={edu.education}
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
          <FormField name="degree" placeholder="Degree" label="Degree" />
          <FormField
            name="school"
            placeholder="School name"
            label="School name"
          />
          <div className="date-container">
            <FormDatePicker
              name="startDate"
              placeholder="Start date"
              label="Start Date"
            />
            <FormDatePicker
              name="endDate"
              placeholder="End date"
              label="End Date"
            />
          </div>

          <EditControls onCancel={() => showWarning(formProps)} />
        </>
      )}
    </Formik>
  );
}

export default EducationAddModal;
