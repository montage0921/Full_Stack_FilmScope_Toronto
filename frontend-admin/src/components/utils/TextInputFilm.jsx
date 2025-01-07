import React from "react";

function TextInputFilm({ name, keyName, value, handleFunction, inputWidth }) {
  return (
    <div className="flex w-2/5 gap-2 items-center">
      <label
        htmlFor={keyName}
        className=" text-lg font-semibold text-gray-800 "
      >
        {name}
      </label>
      <input
        id={keyName}
        className={`h-8 ${inputWidth}  bg-transparent border-b-2 border-white text-white flex-grow
          focus:outline-none focus:border-blue-500 focus:text-blue-900 focus:font-bold`}
        value={value || ""}
        onChange={(e) => {
          handleFunction(e.target.value);
        }}
      ></input>
    </div>
  );
}

export default TextInputFilm;
