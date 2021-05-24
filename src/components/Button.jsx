import React from "react";

function Button({
  label = "",
  color = "primary",
  textColor = "white",
  outline = false,
  textStyle,
  buttonStyle,
  onClick,
  className,
  disabled = false,
  ...otherProps
}) {
  return (
    <div
      className={`button btn-${color} ${className} ${
        outline ? "outline" : null
      } ${disabled ? "disabled" : null}`}
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      {...otherProps}
    >
      <p className={`btn-text text-${textColor}`} style={textStyle}>
        {label.toLocaleUpperCase()}
      </p>
    </div>
  );
}

export default Button;
