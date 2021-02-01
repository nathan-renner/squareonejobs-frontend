import React from "react";

const Card = ({ children, className, ...otherProps }) => {
  return (
    <div className={`card ${className}`} {...otherProps}>
      {children}
    </div>
  );
};

export default Card;
