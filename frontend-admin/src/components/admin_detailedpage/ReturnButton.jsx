import React from "react";
import { Link } from "react-router-dom";

function ReturnButton() {
  return (
    <Link
      to={"/"}
      className="absolute w-[80px] h-[80px] m-5 stroke-black hover:stroke-gray-800"
    >
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.9998 8L6 14L12.9998 21"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

export default ReturnButton;
