import React from "react";

function MultiButton({
  className,
  buttons = [],
  active = 0,
  onClick = () => true,
}) {
  return (
    <div className={`multi-button ${className}`}>
      {buttons.map((button, index) => (
        <div
          onClick={() => onClick(index)}
          className={`mbtn ${
            index === 0 ? "first" : index === buttons.length - 1 ? "last" : null
          } ${index === active ? "active" : null}`}
        >
          {button}
        </div>
      ))}
    </div>
  );
}

export default MultiButton;
