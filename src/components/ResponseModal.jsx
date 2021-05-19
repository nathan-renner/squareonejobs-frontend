import React from "react";
import Button from "./Button";
import Icon from "./Icon";
import Modal from "./Modal";
import { MdClear, MdCheck } from "react-icons/md";

const iconStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "2em",
};

function ResponseModal({
  visible,
  type = "success",
  header = "",
  body = "",
  buttonText = "OK",
  onButtonClick = () => true,
  ...otherProps
}) {
  return (
    <Modal
      visible={visible}
      className="error-modal modal-sm"
      {...otherProps}
      Content={() => (
        <>
          <Icon
            size={50}
            Icon={type === "error" ? MdClear : MdCheck}
            color={type === "error" ? "danger" : "primary"}
            style={iconStyle}
          />
          <h2>{header}</h2>
          <p>{body}</p>
          <Button
            label={buttonText}
            onClick={onButtonClick}
            color="secondary"
          />
        </>
      )}
    ></Modal>
  );
}

export default ResponseModal;
