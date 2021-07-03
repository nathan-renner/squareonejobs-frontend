import React from "react";

function RadioButtons({ buttons, active, onChange }) {
  return (
    <>
      {buttons.map(({ name, label }, index) => (
        <label className="radio-button" key={name}>
          <input
            type="radio"
            checked={active === name}
            onChange={() => onChange(name)}
          />
          <span className="checkmark"></span>
          {label}
        </label>
      ))}
    </>
  );
}

export default RadioButtons;
