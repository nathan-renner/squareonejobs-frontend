import React from "react";

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="checkbox" style={{ marginBottom: "1em" }}>
      <input onChange={onChange} type="checkbox" defaultChecked={checked} />
      <span className="checkmark"></span>
      {label}
    </label>
  );
}

export default Checkbox;
