import React from "react";

function TextInputShow({ type = "text", name, keyName, showDto, setter }) {
  const handleOnChange = (e) => {
    let newInput = e.target.value;
    if (type === "number") newInput = Number(newInput);
    setter((prev) => {
      return {
        ...prev,
        [keyName]: newInput,
      };
    });
  };

  return (
    <div className="flex w-2/5 gap-2 items-center">
      <label className=" text-lg font-semibold text-gray-800 ">{`${name}:`}</label>
      <input
        type={type}
        className="h-8  bg-transparent border-b-2 border-white text-white flex-grow
          focus:outline-none focus:border-blue-500 focus:text-blue-900 focus:font-bold"
        value={showDto[keyName] || ""}
        onChange={handleOnChange}
      ></input>
    </div>
  );
}

export default TextInputShow;
