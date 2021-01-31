import React from "react";

const Card = ({ children, ...otherProps }) => {
  return (
    <div className="card" style={otherProps} {...otherProps}>
      {children}
    </div>
  );
};

export default Card;
