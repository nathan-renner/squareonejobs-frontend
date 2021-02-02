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
  rightIconSize = 20,
  rightIconColor,
  rightIconOnClick,
  onChange,
  ...otherprops
}) {
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
      <input {...{ placeholder, onChange }} style={textStyle} {...otherprops} />
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

export default TextInput;
