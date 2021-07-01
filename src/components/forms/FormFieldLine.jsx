import React from "react";
import { useFormikContext } from "formik";

import { TextInputLine } from "../common";

function FormFieldLine({ name, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, values, touched } =
    useFormikContext();
  return (
    <>
      <TextInputLine
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => setFieldValue(name, e.target.value)}
        value={values[name]}
        error={touched[name] && errors[name]}
        {...otherProps}
      />
    </>
  );
}

export default FormFieldLine;
