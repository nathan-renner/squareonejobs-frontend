import React from "react";
import * as Yup from "yup";
import { MdClear } from "react-icons/md";
import { Formik } from "formik";

import EditControls from "./EditControls";
import { FormField, FormDate } from "../../forms";

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
  const handleSubmit = (education, formProps) => {
    handleEditEducation(education, edu.index);
    setIsEditingEducation(false);
    formProps.resetForm();
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
          <FormField name="degree" label="Degree" />
          <FormField name="school" label="School name" />
          <div className="split">
            <FormDate name="startDate" label="Start Date" />
            <FormDate name="endDate" label="End Date" />
          </div>

          <EditControls onCancel={() => showWarning(formProps)} />
        </>
      )}
    </Formik>
  );
}

export default EducationAddModal;
