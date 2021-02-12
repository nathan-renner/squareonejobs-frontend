import React from "react";

function PersonIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M26.775 35.2574C29.3625 37.1474 32.5575 38.2499 36 38.2499C44.4195 38.2499 51.75 30.9622 51.75 22.4999C51.75 13.8149 44.685 6.74994 36 6.74994C27.315 6.74994 20.25 13.8149 20.25 22.4999C20.25 27.7424 22.815 32.3999 26.775 35.2574Z"
      />
      <path
        className="path"
        d="M49.86 37.2374C46.2375 40.6574 41.355 42.7499 36 42.7499C30.645 42.7499 25.7625 40.6574 22.14 37.2374C12.9825 42.1874 6.75 51.8849 6.75 62.9999C6.75 64.2374 7.7625 65.2499 9 65.2499H63C64.2375 65.2499 65.25 64.2374 65.25 62.9999C65.25 51.8849 59.0175 42.1874 49.86 37.2374Z"
      />
    </svg>
  );
}

export default PersonIcon;
