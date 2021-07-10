import React from "react";

function Checkbox({ checked, onChange, label, controlled = true }) {
  const options = controlled ? { defaultChecked: checked } : { checked };
  return (
    <label
      className="checkbox"
      style={{ marginBottom: "1em" }}
      onClick={onChange}
    >
      <input onChange={onChange} type="checkbox" {...options} />
      <span className="checkmark"></span>
      {label}
    </label>
  );
}

export default Checkbox;
