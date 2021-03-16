import React from "react";
import { Formik } from "formik";

function Form({ initialValues, onSubmit, validationSchema, children }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props) => <div {...props}>{children}</div>}
    </Formik>
  );
}

export default Form;
