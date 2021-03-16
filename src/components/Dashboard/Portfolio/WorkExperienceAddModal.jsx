import React, { useState } from "react";
import * as Yup from "yup";
import { Form, FormField } from "../../forms";
import WarningModal from "../../WarningModal";
import EditControls from "./EditControls";
import FormDatePicker from "../../forms/FormDatePicker";
import { Formik } from "formik";

const schema = Yup.object().shape({
  position: Yup.string().required().max(64).label("Degree"),
  company: Yup.string().required().max(64).label("School"),
  startDate: Yup.date().required().label("Start Date"),
  endDate: Yup.date().required().label("End Date"),
});

function WorkExperienceAddModal({
  setIsAdding,
  exp = {
    position: "",
    company: "",
    startDate: undefined,
    endDate: undefined,
  },
}) {
  const handleSubmit = ({ experience }) => {
    //updateElement("about", about);
    setIsAdding(false);
  };
  const showWarning = (props) => {
    const { position, company, startDate, endDate } = props.values;

    if (
      position !== exp.position ||
      company !== exp.company ||
      startDate !== exp.startDate ||
      endDate !== exp.endDate
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
      initialValues={exp}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {(formProps) => (
        <>
          <FormField name="position" placeholder="Position" label="Position" />
          <FormField
            name="company"
            placeholder="Company name"
            label="Company name"
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

export default WorkExperienceAddModal;
