import React from "react";

function Button({
  label = "",
  color = "primary",
  textColor = "white",
  outline = false,
  textStyle,
  buttonStyle,
  onClick,
  ...otherProps
}) {
  return (
    <div
      className={`button btn-${color} ${outline ? "outline" : null}`}
      style={buttonStyle}
      onClick={onClick}
      {...otherProps}
    >
      <p className={`btn-text text-${textColor}`} style={textStyle}>
        {label.toLocaleUpperCase()}
      </p>
    </div>
  );
}

export default Button;
