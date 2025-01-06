import React from "react";

function CancelIcon({ size, cancelAddMode }) {
  return (
    <div
      className="fill-red-500 hover:cursor-pointer"
      style={{ width: `${size}px`, height: `${size}px` }}
      onClick={() => {
        cancelAddMode(false);
      }}
    >
      <svg viewBox="0 0 512 512">
        <g id="work-case" transform="translate(91.520000, 91.520000)">
          <polygon
            id="Close"
            points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
          ></polygon>
        </g>
      </svg>
    </div>
  );
}

export default CancelIcon;
