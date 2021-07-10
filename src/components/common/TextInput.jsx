import React, { useRef, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

function TextInput({
  type = "text",
  value,
  name,
  label,
  helperText = false,
  LeftIcon = false,
  leftIconOnClick = () => true,
  RightIcon = false,
  rightIconOnClick = () => true,
  error = false,
  onBlur = () => true,
  disabled = false,
  controlled = false,
  onClick = () => true,
  onSubmit = () => true,
  startingChar = false,
  width = false,
  rows = 3,
  noMarginBottom = false,
  ...otherProps
}) {
  const input = useRef();
  const [focused, setFocused] = useState(false);
  const onFocus = () => {
    if (!disabled) {
      controlled && onClick();
      input.current.focus();
      setFocused(true);
    }
  };
  const handleOnBlur = () => {
    if (!disabled) {
      setFocused(false);
      onBlur();
    }
  };

  const options = controlled
    ? {
        value: value,
        ...otherProps,
      }
    : { ...otherProps };

  return (
    <div
      className={`line-text-input-container ${
        noMarginBottom ? "no-margin-bottom" : null
      }`}
      style={width ? { width } : null}
    >
      <div
        className={`line-text-input ${focused ? "focused" : null} ${
          error ? "error" : null
        } ${
          controlled
            ? value !== ""
              ? "not-empty"
              : null
            : input.current && input.current.value !== ""
            ? "not-empty"
            : null
        } ${disabled ? "disabled" : null}`}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
      >
        {LeftIcon && (
          <LeftIcon className="left-icon" onClick={leftIconOnClick} />
        )}
        {startingChar && <p className="starting-char">{startingChar}</p>}
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            onClick={onFocus}
            onFocus={onFocus}
            onBlur={handleOnBlur}
            ref={input}
            disabled={disabled}
            rows={rows}
            {...options}
          />
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            onClick={onFocus}
            onFocus={onFocus}
            onBlur={handleOnBlur}
            ref={input}
            disabled={disabled}
            {...options}
          />
        )}
        {error ? (
          <RiErrorWarningFill className="right-icon" />
        ) : (
          RightIcon && (
            <RightIcon className="right-icon" onClick={rightIconOnClick} />
          )
        )}
        <label onClick={onFocus}>{label}</label>
      </div>
      <p className="helper-text">
        {error ? error : helperText ? helperText : null}
      </p>
    </div>
  );
}

export default TextInput;
