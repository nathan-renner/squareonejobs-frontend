import React, { useRef, useState } from "react";
import { MdPerson } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";

function TextInputLine({
  type = "text",
  name,
  label,
  helperText = false,
  LeftIcon = false,
  RightIcon = false,
  rightIconOnClick = () => true,
  error = false,
  onBlur = () => true,
  disabled = false,
  ...otherProps
}) {
  const input = useRef();
  const [focused, setFocused] = useState(false);
  const onFocus = () => {
    if (!disabled) {
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

  return (
    <div className="line-text-input-container">
      <div
        className={`line-text-input ${focused ? "focused" : null} ${
          error ? "error" : null
        } ${input.current && input.current.value !== "" ? "not-empty" : null} ${
          disabled ? "disabled" : null
        }`}
      >
        {LeftIcon && <LeftIcon className="left-icon" />}
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            onFocus={onFocus}
            onBlur={handleOnBlur}
            ref={input}
            disabled={disabled}
            {...otherProps}
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
            {...otherProps}
          />
        )}
        {error ? (
          <RiErrorWarningFill className="right-icon" />
        ) : (
          RightIcon && (
            <RightIcon className="right-icon" onClick={rightIconOnClick} />
          )
        )}
        <label for={name} onClick={onFocus}>
          {label}
        </label>
      </div>
      <p className="helper-text">
        {error ? error : helperText ? helperText : null}
      </p>
    </div>
  );
}

export default TextInputLine;
