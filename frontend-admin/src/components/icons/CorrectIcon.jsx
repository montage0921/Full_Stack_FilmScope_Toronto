import React from "react";

function CorrectIcon({ size, handleFunction }) {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className="fill-green-500 hover:cursor-pointer"
      onClick={handleFunction}
    >
      <svg
        version="1.1"
        id="Capa_1"
        viewBox="0 0 335.765 335.765"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <polygon points="311.757,41.803 107.573,245.96 23.986,162.364 0,186.393 107.573,293.962 335.765,65.795 		" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default CorrectIcon;
