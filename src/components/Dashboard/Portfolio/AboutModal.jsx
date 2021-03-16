import React, { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import * as Yup from "yup";
import { FormField } from "../../forms";
import EditControls from "./EditControls";
import { Formik } from "formik";

const schema = Yup.object().shape({
  about: Yup.string().max(250).required().label("About text"),
});

function AboutModal({ updateElement, about, setIsEditing }) {
  const handleSubmit = ({ about: newAbout }, { resetForm }) => {
    updateElement("about", newAbout);
    setIsEditing(false);
    resetForm({ values: { about: newAbout } });
  };
  const showWarning = (formProps) => {
    const { values, resetForm } = formProps;
    if (values.about !== about) {
      const result = window.confirm(
        "Are you sure you want to discard your changes?"
      );
      if (result) {
        setIsEditing(false);
        resetForm();
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <Formik
      initialValues={{ about }}
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
            type="textarea"
            maxLength="250"
            name="about"
            placeholder="Tell us about yourself"
          />
          <EditControls onCancel={() => showWarning(formProps)} />
        </>
      )}
    </Formik>
  );
}

export default AboutModal;
