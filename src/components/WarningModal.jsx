import React from "react";
import Modal from "./Modal";
import EditControls from "./Dashboard/Portfolio/EditControls";

function WarningModal({
  visible = true,
  cancelText,
  submitText,
  onCancel,
  onSubmit,
  title,
  message,
}) {
  const renderWarning = () => {
    return (
      <div className="warning-message">
        {message}
        <EditControls {...{ cancelText, submitText, onCancel, onSubmit }} />
      </div>
    );
  };

  return (
    <Modal
      className="modal-sm"
      title={title}
      visible={visible}
      Content={renderWarning}
    />
  );
}

export default WarningModal;
