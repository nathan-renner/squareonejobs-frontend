import React from "react";

const Card = ({ children, className, simple, ...otherProps }) => {
  return (
    <div
      className={`card ${simple ? "card-simple " : null}  ${className}`}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default Card;
