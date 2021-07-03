import React, { useRef, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

function TextInputLine({
  type = "text",
  value,
  name,
  label,
  helperText = false,
  LeftIcon = false,
  RightIcon = false,
  rightIconOnClick = () => true,
  error = false,
  onBlur = () => true,
  disabled = false,
  controlled = false,
  onClick = () => true,
  startingChar = false,
  width = false,
  rows = 3,
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
    <div className="line-text-input-container" style={width ? { width } : null}>
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
      >
        {LeftIcon && <LeftIcon className="left-icon" />}
        {startingChar && <p className="starting-char">{startingChar}</p>}
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
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

export default TextInputLine;
