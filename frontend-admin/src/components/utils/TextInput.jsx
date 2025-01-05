import React, { useContext } from "react";
import { editContext } from "../../containers/EditShow";

function TextInput({ keyName, value, name }) {
  const { showDto, setShowDto } = useContext(editContext);
  return (
    <div className="flex flex-col w-2/5">
      <label htmlFor={keyName} className="text-lg font-semibold text-gray-800 ">
        {name}
      </label>
      <input
        id={keyName}
        className="h-8 mb-5  bg-transparent border-b-2 border-white text-white
          focus:outline-none focus:border-blue-500 focus:text-blue-900 focus:font-bold"
        value={value || ""}
        onChange={(e) => {
          setShowDto((prev) => ({
            ...prev,
            [keyName]: e.target.value,
          }));
        }}
      ></input>
    </div>
  );
}

export default TextInput;
