import React from "react";
import SubmitButton from "./../../forms/SubmitButton";

import { Button } from "../../common";

function EditControls({
  onCancel,
  onSubmit,
  cancelText = "Cancel",
  submitText = "Submit Changes",
}) {
  return (
    <div className="controls">
      <p onClick={onCancel}>{cancelText}</p>
      {onSubmit ? (
        <Button onClick={onSubmit} label={submitText} />
      ) : (
        <SubmitButton label={submitText} />
      )}
    </div>
  );
}

export default EditControls;
