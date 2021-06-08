import * as React from "react";

function CheckIcon({ fill = "primary", ...props }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 25 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.285 9.87l8.726 8.726c.38.38.998.38 1.378 0L24.714 4.271a.975.975 0 000-1.378L22.107.286a.975.975 0 00-1.378 0l-10.42 10.419a.975.975 0 01-1.378 0l-4.669-4.67a.975.975 0 00-1.358-.019L.305 8.473a.975.975 0 00-.02 1.398z"
        fill={fill === "secondary" ? "#1D8CF8" : "#51CC8E"}
      />
      <path
        d="M22.107.285a.975.975 0 00-1.378 0l-8.276 8.276v7.971L24.715 4.271a.975.975 0 000-1.378L22.107.285z"
        fill={fill === "secondary" ? "#1D8CF8" : "#51CC8E"}
      />
    </svg>
  );
}

export default CheckIcon;
