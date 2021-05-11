import React, { useState } from "react";
import { MdMoreVert } from "react-icons/md";

function OptionsDropdown({ options }) {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <div className="options-dropdown">
      <MdMoreVert
        className="more-icon"
        size={30}
        onClick={() => setIsShowing(!isShowing)}
      />
      <div className={`options ${isShowing ? "active" : null}`}>
        {options.map((option) => (
          <div className="option" key={option.name} onClick={option.onClick}>
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionsDropdown;
