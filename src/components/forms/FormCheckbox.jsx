import React from "react";
import { useFormikContext } from "formik";
import { Checkbox } from "../common";

function FormCheckbox({ name, label }) {
  const { setFieldValue, values } = useFormikContext();

  return (
    <Checkbox
      checked={values[name]}
      onChange={() => setFieldValue(name, !values[name])}
      label={label}
    />
  );
}

export default FormCheckbox;
