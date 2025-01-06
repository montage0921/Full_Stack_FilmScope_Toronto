import React from "react";

function TextArea({ value, handleFunction }) {
  return (
    <div className=" w-[500px] h-[200px]">
      <div className=" text-lg font-semibold text-gray-800 ">Overview: </div>
      <textarea
        className="w-full h-full"
        onChange={(e) => {
          handleFunction(e.target.value);
        }}
        value={value}
      ></textarea>
    </div>
  );
}

export default TextArea;
