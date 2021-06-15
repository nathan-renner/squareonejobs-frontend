import * as React from "react";

function CheckIconWhite(props) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)">
        <path
          d="M10 20c5.52 0 9.996-4.477 9.996-10S15.52 0 9.999 0C4.48 0 .002 4.477.002 10S4.478 20 10 20z"
          fill="#fff"
        />
        <path
          d="M10 0h-.014v20H10c5.521 0 9.997-4.477 9.997-10S15.52 0 10 0z"
          fill="#fff"
        />
        <path
          d="M4.348 10.199l4.043 4.043a.452.452 0 00.639 0l6.638-6.638a.451.451 0 000-.638L14.46 5.757a.452.452 0 00-.639 0l-4.828 4.828a.452.452 0 01-.639 0L6.191 8.422a.452.452 0 00-.63-.01l-1.204 1.14a.452.452 0 00-.01.647z"
          fill="#51CC8E"
        />
        <path
          d="M14.46 5.757a.452.452 0 00-.639 0L9.986 9.592v3.694l5.682-5.682a.452.452 0 000-.638L14.46 5.757z"
          fill="#51CC8E"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default CheckIconWhite;
