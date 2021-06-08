import React, { useEffect, useRef, useState } from "react";
import { MdMoreVert } from "react-icons/md";

function OptionsDropdown({ options }) {
  const [isShowing, setIsShowing] = useState(false);
  const wrapperRef = useRef();

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsShowing(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);

  return (
    <div className="options-dropdown" ref={wrapperRef}>
      <MdMoreVert
        className="more-icon"
        size={30}
        onClick={() => setIsShowing(!isShowing)}
      />
      <div className={`options ${isShowing ? "active" : null}`}>
        {options.map((option) => (
          <div
            className="option"
            key={option.name}
            onClick={() => {
              setIsShowing(false);
              option.onClick();
            }}
          >
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OptionsDropdown;
