import React from "react";

function ToggleButton({ label = "", setActive = () => true, active = false }) {
  return (
    <div
      className={`toggle-button ${active ? "active" : null}`}
      onClick={setActive}
    >
      {label}
    </div>
  );
}

export default ToggleButton;
