import React from "react";
import { useFormikContext } from "formik";

import { Button } from "../common";

function SubmitButton(props) {
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      label={props.label}
      onClick={handleSubmit}
      style={props.style}
      {...props}
    />
  );
}

export default SubmitButton;
