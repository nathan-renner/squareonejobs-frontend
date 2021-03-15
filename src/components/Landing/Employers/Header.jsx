import React from "react";

function Header(props) {
  return (
    <header>
      <h1>Employer header</h1>
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 144 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="line"
      >
        <path
          d="M73 36C73 0 109 0 109 0V72H37C37 72 73 72 73 36Z"
          fill="white"
        />
        <path d="M144 0H108V72H144V0Z" fill="white" />
      </svg>
    </header>
  );
}

export default Header;
