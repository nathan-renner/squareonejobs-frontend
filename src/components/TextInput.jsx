import React from "react";

function TextInput({
  containerStyle,
  placeholder,
  textStyle,
  LeftIcon,
  leftIconSize = 20,
  leftIconColor,
  leftIconOnClick,
  RightIcon,
  rightIconSize,
  rightIconColor,
  rightIconOnClick,
  onChange,
}) {
  return (
    <div className="input-container" style={containerStyle}>
      {LeftIcon && (
        <LeftIcon
          className="left-icon"
          onClick={leftIconOnClick}
          color={leftIconColor}
          size={leftIconSize}
        />
      )}
      <input {...{ placeholder, onChange }} style={textStyle} />
      {RightIcon && (
        <RightIcon
          className="right-icon"
          onClick={rightIconOnClick}
          color={rightIconColor}
          size={rightIconSize}
        />
      )}
    </div>
  );
}

export default TextInput;
