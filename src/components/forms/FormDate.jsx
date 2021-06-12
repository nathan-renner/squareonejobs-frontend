import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

import "react-datepicker/dist/react-datepicker.css";

function FormDate({ name, placeholder, label, time = false, ...otherProps }) {
  const { values, errors, setFieldTouched, setFieldValue, touched } =
    useFormikContext();

  return (
    <div>
      {label ? <p className="input-label">{label}</p> : null}
      <div className="input-container sm">
        <input
          type={time ? "datetime-local" : "date"}
          value={values[name] ? values[name] : null}
          onChange={(e) => setFieldValue(name, e.target.value)}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
        />
      </div>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
}

export default FormDate;
