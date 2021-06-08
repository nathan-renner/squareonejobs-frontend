import React from "react";
import { MdClear } from "react-icons/md";
import Card from "./Card";
import Icon from "./Icon";

function Modal({
  visible = true,
  listing = false,
  className,
  Content,
  title,
  onCancel,
  componentProps,
}) {
  return (
    <div className={`modal ${className} ${visible ? "visible" : null}`}>
      <div className="modal-overlay" onClick={onCancel} />
      <Card className="modal-content" onClick={(e) => e.preventDefault()}>
        {onCancel &&
          (listing ? (
            <Icon
              Icon={MdClear}
              size={30}
              color="white"
              iconColor="medium"
              className="exit-listing"
              onClick={onCancel}
            />
          ) : (
            <MdClear size={25} className="exit" onClick={onCancel} />
          ))}
        {title && <h2>{title}</h2>}
        {Content && <Content {...componentProps} visible={visible} />}
      </Card>
    </div>
  );
}

export default Modal;
