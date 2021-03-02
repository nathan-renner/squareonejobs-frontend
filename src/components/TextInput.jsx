import React from "react";

function TextInput({
  type = "input",
  containerStyle,
  placeholder,
  textStyle,
  LeftIcon,
  leftIconSize = 20,
  leftIconColor,
  leftIconOnClick,
  RightIcon,
  rightIconSize = 20,
  rightIconColor,
  rightIconOnClick,
  onChange,
  ...otherprops
}) {
  if (type === "textarea") {
    return (
      <div className="textarea-container" style={containerStyle}>
        {LeftIcon && (
          <LeftIcon
            className="left-icon"
            color={leftIconColor}
            size={leftIconSize}
            onClick={leftIconOnClick}
          />
        )}
        <textarea
          {...{ placeholder, onChange, type }}
          className="textarea"
          style={textStyle}
          {...otherprops}
        />
        {RightIcon && (
          <RightIcon
            className="right-icon"
            color={rightIconColor}
            size={rightIconSize}
            onClick={rightIconOnClick}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="input-container" style={containerStyle}>
        {LeftIcon && (
          <LeftIcon
            className="left-icon"
            color={leftIconColor}
            size={leftIconSize}
            onClick={leftIconOnClick}
          />
        )}
        <input
          {...{ placeholder, onChange, type }}
          style={textStyle}
          {...otherprops}
        />
        {RightIcon && (
          <RightIcon
            className="right-icon"
            color={rightIconColor}
            size={rightIconSize}
            onClick={rightIconOnClick}
          />
        )}
      </div>
    );
  }
}

export default TextInput;
