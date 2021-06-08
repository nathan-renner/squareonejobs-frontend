import React from "react";
import { useFormikContext } from "formik";

import { TextInput } from "../common";

import ErrorMessage from "./ErrorMessage";

function FormField({ name, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => setFieldValue(name, e.target.value)}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage
        error={errors[name]}
        visible={touched[name]}
        backgroundColor="foreground"
      />
    </>
  );
}

export default FormField;
