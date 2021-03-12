import React from "react";
import { MdClear } from "react-icons/md";
import Card from "./Card";

function Modal({
  visible = true,
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
        {onCancel && <MdClear size={25} className="exit" onClick={onCancel} />}
        {title && <h2>{title}</h2>}
        {Content && <Content {...componentProps} />}
      </Card>
    </div>
  );
}

export default Modal;
