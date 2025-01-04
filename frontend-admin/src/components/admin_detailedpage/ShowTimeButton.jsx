import React, { useState } from "react";
import { convertToAMPM } from "../../utils/timeConverter";

function ShowTimeButton({ time, link }) {
  const [isHover, setIsHover] = useState(false);

  const timeStr = convertToAMPM(time);

  return (
    <a href={link}>
      <button
        className={
          isHover
            ? "bg-red-400 text-white font-bold m-3 h-[30px] w-[80px]"
            : "bg-black text-white m-3 h-[30px] w-[80px]"
        }
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        {isHover ? "BUY" : timeStr}
      </button>
    </a>
  );
}

export default ShowTimeButton;
