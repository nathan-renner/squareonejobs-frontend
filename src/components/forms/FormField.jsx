import React from "react";
import { useFormikContext } from "formik";

import { TextInput } from "../common";

function FormField({ name, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, values, touched } =
    useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => setFieldValue(name, e.target.value)}
        value={values[name]}
        error={touched[name] && errors[name]}
        controlled
        {...otherProps}
      />
    </>
  );
}

export default FormField;
