import React from "react";
import { useFormikContext } from "formik";

import { TextInputLine } from "../common";

function FormFieldLine({ name, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, values } = useFormikContext();
  return (
    <>
      <TextInputLine
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => setFieldValue(name, e.target.value)}
        value={values[name]}
        error={errors[name]}
        {...otherProps}
      />
    </>
  );
}

export default FormFieldLine;
