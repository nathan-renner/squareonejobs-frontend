import React from "react";

function TextInput({
  type = "input",
  active = false,
  label = false,
  onSubmit,
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

  ...otherprops
}) {
  if (type === "textarea") {
    return (
      <>
        {label ? <p className="input-label">{label}</p> : null}
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
            {...{ placeholder, type }}
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
      </>
    );
  } else if (type === "search") {
    return (
      <form
        className={`search-container ${active ? "active" : null}`}
        onSubmit={onSubmit}
      >
        {LeftIcon && (
          <LeftIcon
            className="left-icon"
            color={leftIconColor}
            size={leftIconSize}
            onClick={leftIconOnClick}
          />
        )}
        <input {...{ placeholder, type }} {...otherprops} />
        {RightIcon && (
          <RightIcon
            className="right-icon"
            color={rightIconColor}
            size={rightIconSize}
            onClick={rightIconOnClick}
          />
        )}
      </form>
    );
  } else {
    return (
      <>
        {label ? <label className="input-label">{label}</label> : null}
        <div className="input-container" style={containerStyle}>
          {LeftIcon && (
            <LeftIcon
              className="left-icon"
              color={leftIconColor}
              size={leftIconSize}
              onClick={leftIconOnClick}
            />
          )}
          <input {...{ placeholder, type }} style={textStyle} {...otherprops} />
          {RightIcon && (
            <RightIcon
              className="right-icon"
              color={rightIconColor}
              size={rightIconSize}
              onClick={rightIconOnClick}
            />
          )}
        </div>
      </>
    );
  }
}

export default TextInput;
