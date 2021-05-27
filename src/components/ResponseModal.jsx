import React from "react";
import Button from "./Button";
import Icon from "./Icon";
import Modal from "./Modal";
import { MdClear, MdCheck } from "react-icons/md";
import { useResponseModal } from "./../hooks/useResponseModal";
import Lottie from "lottie-react";

import Success from "../assets/animations/success.json";
import Failed from "../assets/animations/failed.json";

const iconStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "2em",
  height: 200,
  width: 200,
};

function ResponseModal(props) {
  const { modal, setModal } = useResponseModal();

  return (
    <Modal
      visible={modal}
      className="error-modal modal-sm"
      onCancel={modal.onCancel ? modal.onCancel : () => setModal(false)}
      {...props}
      Content={() => (
        <>
          <Lottie
            animationData={modal.type === "error" ? Failed : Success}
            loop={true}
            autoplay={true}
            style={iconStyle}
          />
          {/* <Icon
            size={50}
            Icon={modal.type === "error" ? MdClear : MdCheck}
            color={modal.type === "error" ? "danger" : "primary"}
            style={iconStyle}
          /> */}
          <h2>{modal.header}</h2>
          <p>{modal.body}</p>
          <Button
            label={modal.buttonText ? modal.buttonText : "OK"}
            onClick={
              modal.onButtonClick ? modal.onButtonClick : () => setModal(false)
            }
            color="secondary"
          />
        </>
      )}
    ></Modal>
  );
}

export default ResponseModal;
